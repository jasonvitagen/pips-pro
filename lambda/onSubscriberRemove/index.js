const AWS = require('aws-sdk');
const emailTemplate = require('./emails/package-expiry-notification');
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

const sns = new AWS.SNS();

exports.handler = async (event, context) => {
    console.log(event);

    const validTasks = event.Records.filter(
        record => record.eventName === 'REMOVE' && record.userIdentity
    );

    const tasks = validTasks.map(async record => {
        await new Promise((resolve, reject) => {
            sns.unsubscribe(
                {
                    SubscriptionArn: record.dynamodb.OldImage.SubscriptionArn.S
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                }
            );
        });

        const message = {
            from: 'Pips-Pro <admin@pips-pro.com>',
            to: record.dynamodb.OldImage.Email.S,
            subject: `Signal Package Expired at Pips-Pro.com`,
            html: emailTemplate({
                name: record.dynamodb.OldImage.Name.S
            })
        };

        await mailgun
            .messages()
            .send(message)
            .then(body => {
                console.log(body);
            })
            .catch(err => console.log(err));
    });

    return Promise.all(tasks).catch(err => {
        console.log(err);
    });
};
