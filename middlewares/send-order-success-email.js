const
    mailgun = require('../setup/mailgun')
    , emailTemplate = require('../emails/order-confirmation');

module.exports = (req, res, next) => {

    process.nextTick(() => {
        const {Name, UserEmail, SignalPackage, MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;
        const
            message = {
                from: 'Pips-Pro <admin@pips-pro.com>',
                to: UserEmail,
                subject: `Your Order at Pips-Pro.com (#${RefNo})`,
                html: emailTemplate(req.body)
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