const
    transporter = require('../setup/mailgun');

module.exports = (req, res, next) => {

    process.nextTick(() => {
        const {Name, UserEmail, MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;
        const
            message = {
                from: 'Pips-Pro <admin@pips-pro.com>',
                to: UserEmail,
                subject: 'Order at Pips-Pro.com',
                html: `
                    <p>Hi ${Name},</p>
                    <p>Your payment is successful.</p>
                    <p>Please find below your order info:</p>
                    <p>Reference Number: ${RefNo}</p>
                    <p>Amount: ${Currency}${Amount}</p>
                    <p>Package expire at: ${req.packageExpireAt}</p>
                    <p>Your forex signal package is now active and we'll start sending forex signals to your mobile number.</p>
                    <p>Thank you for choosing us.</p>
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