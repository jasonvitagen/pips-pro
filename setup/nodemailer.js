require('dotenv').config({path: require('path').join(__dirname, '../process.env')});

const
    nodemailer = require('nodemailer')
    , mg = require('nodemailer-mailgun-transport')
    , transporter = nodemailer.createTransport(mg({
        auth: {
            api_key: process.env.MAILGUN_PRIVATE,
            domain: process.env.MAILGUN_DOMAIN
        }
    }));

module.exports = transporter;