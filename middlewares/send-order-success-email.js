const
    transporter = require('../setup/nodemailer');

module.exports = (req, res, next) => {

    process.nextTick(() => {
        const {UserEmail, MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;
        console.log(UserEmail);
        const
            message = {
                from: 'admin@pips-pro.com',
                to: UserEmail,
                subject: 'Order is successful',
                text: `Thank you for your order. MerchantCode: ${MerchantCode}, PaymentId: ${PaymentId}, RefNo: ${RefNo}, Amount: ${Amount}, Currency: ${Currency}, TransactionId: ${TransId}, AuthCode: ${AuthCode}, Status: ${Status}, Signature: ${Signature}`
            };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info);
        });

        next();

    });

}