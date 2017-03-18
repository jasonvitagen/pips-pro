const
    mailgun = require('../setup/mailgun');

module.exports = (req, res, next) => {
    process.nextTick(() => {
        const {name, mobile, email} = req.user;
        const
            message = {
                from: 'Pips-Pro <admin@pips-pro.com>',
                to: req.body.email,
                subject: 'Registration at Pips-Pro.com',
                html: `
                    <p>Hi ${name},</p>
                    <p>Thank you for your registration at pips-pro.com</p>
                    <p>Please find below your registration info:</p>
                    <p>Email: ${email}</p>
                    <p>Mobile: ${mobile}</p>
                    <p>Thanks,</p>
                    <p>Pips-Pro</p>
                `
            };

        mailgun.messages().send(message, (err, body) => {
            if (err) {
                console.log(err);
            }
            console.log(body);
        });

        next();

    });

}