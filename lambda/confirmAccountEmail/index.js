const AWS = require('aws-sdk');
const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});
const emailTemplate = require('./emails/confirmation');

exports.handler = async (event, context) => {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

    const user = await new Promise((resolve, reject) => {
        cognitoIdentityServiceProvider.adminGetUser(
            {
                UserPoolId: process.env.USER_POOL_ID,
                Username: event.userName
            },
            (err, data) => {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    reject();
                    return;
                }

                resolve(data);
            }
        );
    });

    const {UserCreateDate} = user;

    if (new Date() - new Date(UserCreateDate) < 60 * 1000) {
        const {
            name,
            email,
            phone_number: mobile
        } = event.request.userAttributes;

        const message = {
            from: 'Pips-Pro <admin@pips-pro.com>',
            to: email,
            subject: 'Registration at Pips-Pro.com',
            html: emailTemplate({
                name,
                email,
                mobile
            })
        };

        await mailgun
            .messages()
            .send(message)
            .then(body => {
                console.log(body);
            })
            .catch(err => console.log(err));
    }

    return event;
};
