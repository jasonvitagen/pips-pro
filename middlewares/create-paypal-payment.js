const
    paypal = require('paypal-rest-sdk')
    , sha1 = require('../helpers/sha1')
    , {IPAY_MERCHANT_KEY, IPAY_MERCHANT_CODE} = process.env;

module.exports = (req, res, next) => {
    process.nextTick(() => {
        
        const {RefNo, Amount, Currency, Signature, SelectedPackage} = req.body;
        
        let mySignature = sha1(IPAY_MERCHANT_KEY + IPAY_MERCHANT_CODE + RefNo + Amount.split('.').join('') + Currency);
        
        if (mySignature !== Signature) {
            return res.send('Invalid signature');
        }

        const payment = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.HOST}paypal/execute?reference=${RefNo}`,
                cancel_url: `${process.env.HOST}payment-status-nok.html`
            },
            transactions: [
                {
                    amount: {
                        total: Amount,
                        currency: Currency
                    },
                    description: `${SelectedPackage}-month package`,
                    custom: RefNo
                }
            ]
        };

        paypal.payment.create(payment, (err, payment) => {
            if (err) {
                return next(err);
            }
            if (payment.payer.payment_method === 'paypal') {
                let redirectUrl;
                for (let i = 0, link; link = payment.links[i]; i++) {
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                res.redirect(redirectUrl);
            }
            next();
        });

    });
}