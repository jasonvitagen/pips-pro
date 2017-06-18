const
    paypal = require('paypal-rest-sdk');

module.exports = (req, res, next) => {
    process.nextTick(() => {
        console.log(req.body);
        if (req.body.event_type !== 'PAYMENT.SALE.COMPLETED') {
            return;
        }

        paypal.notification.webhookEvent.verify(req.headers, req.body, process.env.PAYPAL_WEBHOOK_ID, (err, response) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (response.verification_status !== 'SUCCESS') {
                return next('Not authorized');
            }
        
            const {resource: {id, custom, amount: {total, currency}}} = req.body;

            req.body = {
                MerchantCode: 'Paypal',
                PaymentId: '',
                RefNo: req.body.resource.custom,
                Amount: total,
                Currency: currency,
                Remark: '',
                TransId: id,
                AuthCode: '',
                Status: 1,
                ErrDesc: '',
                Signature: ''
            };

            next();
            
        });

    });
}