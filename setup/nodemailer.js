require('dotenv').config({path: require('path').join(__dirname, '../process.env')});

const
    nodemailer = require('nodemailer')
    , sesTransport = require('nodemailer-ses-transport')
    , transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: '465',
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

module.exports = transporter;