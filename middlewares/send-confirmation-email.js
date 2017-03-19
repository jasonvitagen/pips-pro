const
    mailgun = require('../setup/mailgun')
    , emailTemplate = require('../emails/confirmation');

module.exports = (req, res, next) => {
    process.nextTick(() => {
        const {name, mobile, email} = req.user;
        const
            message = {
                from: 'Pips-Pro <admin@pips-pro.com>',
                to: req.body.email,
                subject: 'Registration at Pips-Pro.com',
                html: emailTemplate(req.user)
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