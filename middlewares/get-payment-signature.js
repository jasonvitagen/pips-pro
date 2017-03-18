const
    sha1 = require('../helpers/sha1')
    , shortid = require('shortid');

module.exports = (req, res, next) => {

    process.nextTick(() => {

        const {paymentId, selectedPackage} = req.body;
        const {name, email, mobile} = req.decodedToken;
        const {IPAY_PAYMENT_POST_URL, IPAY_MERCHANT_CODE, IPAY_MERCHANT_KEY, PACKAGE_1_MONTH_RATE, PACKAGE_3_MONTH_RATE, PACKAGE_6_MONTH_RATE, IPAY_CURRENCY, IPAY_RESPONSE_URL, IPAY_BACKEND_URL} = process.env;
        const packages = {
            '1': 1,
            '3': 3,
            '6': 6
        };
        const pricing = {
            '1': PACKAGE_1_MONTH_RATE,
            '3': PACKAGE_3_MONTH_RATE,
            '6': PACKAGE_6_MONTH_RATE
        };
        const refNo = shortid.generate();
        const signalPackage = packages[selectedPackage]
        const amount = Number(pricing[selectedPackage]).toFixed(2);
        req.signature = {
            PaymentPostUrl: IPAY_PAYMENT_POST_URL,
            MerchantCode: IPAY_MERCHANT_CODE,
            PaymentId: paymentId,
            RefNo: refNo,
            Amount: amount,
            Currency: IPAY_CURRENCY,
            ProdDesc: `${selectedPackage}-month signal package`,
            UserName: name,
            UserEmail: email,
            UserContact: mobile,
            Remark: '',
            Signature: sha1(IPAY_MERCHANT_KEY + IPAY_MERCHANT_CODE + refNo + amount.split('.').join('') + IPAY_CURRENCY),
            ResponseUrl: IPAY_RESPONSE_URL,
            BackendUrl: IPAY_BACKEND_URL,
            SignalPackage: signalPackage
        };

        next();

    });
}