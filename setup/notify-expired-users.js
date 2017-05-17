const
    mailgun = require('./mailgun')
    , emailTemplate = require('../emails/package-expiry-notification')
    , db = require('./mongo')
    , cron = require('node-cron');

cron.schedule('0 14 * * *', () => {
    console.log('Running notify expired users cron task');
    db.User.find({packageExpireAt: {$lt: new Date(), $gt: new Date(new Date().setDate(new Date().getDate() - 1))}}, (err, users) => {
        if (err) {
            return console.log(err);
        }
        users.forEach(user => {
            const message = {
                from: 'Pips-Pro <admin@pips-pro.com>',
                to: user.email,
                subject: 'Signal Package Expired at Pips-Pro.com',
                html: emailTemplate(user)
            };
            mailgun.messages().send(message, (err, body) => {
                if (err) {
                    console.log(err);
                }
                console.log(body);
            });
        });
    });
});



