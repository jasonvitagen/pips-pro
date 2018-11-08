const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const username = event.requestContext.authorizer.claims['cognito:username'];

    const {Items} = await ddb
        .query({
            TableName: 'Transaction',
            AttributesToGet: [
                'RefNo',
                'Currency',
                'TransId',
                'CreatedAt',
                'Amount'
            ],
            KeyConditions: {
                Username: {
                    ComparisonOperator: 'EQ',
                    AttributeValueList: [username]
                }
            }
        })
        .promise();

    console.log(Items);

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(Items)
    };

    return response;
};
