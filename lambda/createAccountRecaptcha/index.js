const axios = require('axios');
const queryString = require('querystring');

exports.handler = async event => {
    console.log(event);
    return axios
        .post(
            'https://www.google.com/recaptcha/api/siteverify',
            queryString.stringify({
                secret: process.env.RECAPTCHA_SECRET,
                response: event.request.userAttributes['custom:recaptcha2']
            })
        )
        .then(response => {
            console.log(response);
            if (!response.data.success) {
                throw new Error('Invalid recaptcha');
                return;
            }
            event.response.autoConfirmUser = true;
            event.response.autoVerifyEmail = true;
            return event;
        })
        .catch(err => {
            throw new Error('Invalid recaptcha');
        });
};
