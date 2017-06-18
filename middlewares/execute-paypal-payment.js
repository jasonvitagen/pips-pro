const
    paypal = require('paypal-rest-sdk');

module.exports = (req, res, next) => {
    process.nextTick(() => {

        const {paymentId, PayerID} = req.query;

        paypal.payment.execute(paymentId, {payer_id: PayerID}, (err, payment) => {
            if (err) {
                return next(err);
            }
            res.redirect('/payment-status-ok.html?RefNo=' + req.query.reference);
        });

    });
}