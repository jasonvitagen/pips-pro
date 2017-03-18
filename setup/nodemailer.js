require('dotenv').config({path: require('path').join(__dirname, '../process.env')});

// const
//     nodemailer = require('nodemailer')
//     , mg = require('nodemailer-mailgun-transport')
//     , transporter = nodemailer.createTransport(mg({
//         auth: {
//             api_key: process.env.MAILGUN_PRIVATE,
//             domain: process.env.MAILGUN_DOMAIN
//         }
//     }));

const
    mailgun = require('mailgun-js')({
        apiKey: process.env.MAILGUN_PRIVATE,
        domain: process.env.MAILGUN_DOMAIN
    });

// mailgun.messages().send({
//     from: 'Pips-Pro <pips-pro@pips-pro.com>',
//     to: 'jasoncheng@live.com.my',
//     subject: 'Your registration test at pips-pro.com',
//     html: '<p>Hi thank you for your registration at <a href="https://www.pips-pro.com">Pips-Pro.com</a></p>'
// }, (err, body) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(body);
// });

module.exports = mailgun;