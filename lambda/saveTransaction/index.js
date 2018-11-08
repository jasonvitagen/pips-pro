const AWS = require('aws-sdk');
const queryString = require('query-string');
const sha256 = require('./helpers/sha256');
const emailTemplate = require('./emails/order-confirmation');
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

const ddb = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context) => {
    const reqBody = queryString.parse(event.body);

    const {
        MerchantCode,
        PaymentId,
        RefNo,
        Amount,
        Currency,
        Remark: username,
        TransId,
        AuthCode,
        Status,
        ErrDesc,
        Signature
    } = reqBody;

    console.log(reqBody);

    const {
        IPAY_MERCHANT_KEY,
        IPAY_MERCHANT_CODE,
        PRICE_1_MONTH,
        PRICE_3_MONTH,
        PRICE_6_MONTH
    } = process.env;

    const ourSignature = sha256(
        IPAY_MERCHANT_KEY +
            IPAY_MERCHANT_CODE +
            PaymentId +
            RefNo +
            Amount.replace(/[,.]/g, '') +
            Currency +
            Status
    );

    if (!Status || Status === '0') {
        return errorResponse('Payment failed ' + ErrDesc);
    }

    if (ourSignature !== Signature) {
        return errorResponse('Signature not matched');
    }

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        },
        body: 'RECEIVEOK'
    };

    const {Item: existingRecord} = await ddb
        .get({
            TableName: 'Transaction',
            Key: {
                Username: username,
                RefNo
            },
            ConsistentRead: true
        })
        .promise();

    if (existingRecord) {
        console.log('duplicate record');
        return response;
    }

    const nonEmptyReqBody = Object.entries(reqBody).reduce(
        (acc, [key, value]) =>
            value
                ? {
                      ...acc,
                      [key]: value
                  }
                : acc,
        {}
    );

    await ddb
        .put({
            TableName: 'Transaction',
            Item: {
                Username: username,
                CreatedAt: new Date().toISOString(),
                ...nonEmptyReqBody
            }
        })
        .promise();

    const {Item} = await ddb
        .get({
            TableName: 'Subscriber',
            Key: {
                Username: username
            }
        })
        .promise();

    const user = await new Promise((resolve, reject) => {
        cognitoIdentityServiceProvider.adminGetUser(
            {
                UserPoolId: process.env.USER_POOL_ID,
                Username: username
            },
            (err, data) => {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    reject();
                    return;
                }

                const userAttributesObj = data.UserAttributes.reduce(
                    (acc, {Name, Value}) => ({
                        ...acc,
                        [Name]: Value
                    }),
                    {}
                );

                resolve(userAttributesObj);
            }
        );
    });

    const signalPackageMapping = {
        [PRICE_1_MONTH]: 1,
        [PRICE_3_MONTH]: 3,
        [PRICE_6_MONTH]: 6
    };

    const signalPackage = signalPackageMapping[Amount];

    let expireAt;
    if (Item) {
        expireAt = Math.round(
            new Date(
                new Date(Item.ExpireAt * 1000).setMonth(
                    new Date(Item.ExpireAt * 1000).getMonth() + signalPackage
                )
            ).getTime() / 1000
        );
        await ddb
            .update({
                TableName: 'Subscriber',
                Key: {
                    Username: username
                },
                UpdateExpression: 'SET ExpireAt = :expireAt',
                ExpressionAttributeValues: {
                    ':expireAt': expireAt
                }
            })
            .promise();
    } else {
        expireAt = Math.round(
            new Date(
                new Date().setMonth(new Date().getMonth() + signalPackage)
            ).getTime() / 1000
        );
        await ddb
            .put({
                TableName: 'Subscriber',
                Item: {
                    Username: username,
                    CreatedAt: new Date().toISOString(),
                    ExpireAt: expireAt,
                    Email: user.email,
                    Phone: user.phone_number
                }
            })
            .promise();
    }

    const message = {
        from: 'Pips-Pro <admin@pips-pro.com>',
        to: user.email,
        subject: `Your Order at Pips-Pro.com (#${RefNo})`,
        html: emailTemplate({
            Name: user.name,
            SignalPackage: signalPackage,
            RefNo,
            Currency,
            Amount,
            packageExpireAt: new Date(
                expireAt * 1000 + 480 * 60 * 1000
            ).toLocaleString('en-MY')
        })
    };

    await mailgun
        .messages()
        .send(message)
        .then(body => {
            console.log(body);
        })
        .catch(err => console.log(err));

    return response;
};

async function errorResponse(errorMessage) {
    return {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage
        }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
}
