const AWS = require('aws-sdk');
const shortid = require('shortid');
const sha256 = require('./helpers/sha256');

exports.handler = async (event, context) => {
    const {paymentId, selectedPackage} = JSON.parse(event.body);

    const {
        USER_POOL_ID,
        IPAY_MERCHANT_CODE,
        IPAY_MERCHANT_KEY,
        IPAY_PAYMENT_POST_URL,
        CURRENCY,
        IPAY_RESPONSE_URL,
        IPAY_BACKEND_URL,
        PRICE_1_MONTH,
        PRICE_3_MONTH,
        PRICE_6_MONTH
    } = process.env;

    const username = event.requestContext.authorizer.claims['cognito:username'];

    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

    const user = await new Promise((resolve, reject) => {
        cognitoIdentityServiceProvider.adminGetUser(
            {
                UserPoolId: USER_POOL_ID,
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

    const {name, email, phone_number} = user;

    const refNo = shortid.generate();

    const signalPackageMapping = {
        1: PRICE_1_MONTH,
        3: PRICE_3_MONTH,
        6: PRICE_6_MONTH
    };

    const amount = signalPackageMapping[selectedPackage];

    const paymentPostUrl = IPAY_PAYMENT_POST_URL;

    const signature = {
        PaymentPostUrl: paymentPostUrl,
        MerchantCode: IPAY_MERCHANT_CODE,
        PaymentId: paymentId,
        RefNo: refNo,
        Amount: amount,
        Currency: CURRENCY,
        ProdDesc: `${selectedPackage}-month signal package`,
        UserName: name,
        UserEmail: email,
        UserContact: phone_number,
        Remark: username,
        Signature: sha256(
            IPAY_MERCHANT_KEY +
                IPAY_MERCHANT_CODE +
                refNo +
                amount.replace(/[,.]/g, '') +
                CURRENCY
        ),
        SignatureType: 'SHA256',
        ResponseUrl: IPAY_RESPONSE_URL,
        BackendUrl: IPAY_BACKEND_URL,
        SignalPackage: Number(selectedPackage),
        CurrencyPrefix: CURRENCY
    };

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(signature)
    };

    return response;
};
