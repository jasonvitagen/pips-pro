require('dotenv').config({path: require('path').join(__dirname, '../process.env')});

const
    mailgun = require('mailgun-js')({
        apiKey: process.env.MAILGUN_PRIVATE,
        domain: process.env.MAILGUN_DOMAIN
    });

module.exports = mailgun;