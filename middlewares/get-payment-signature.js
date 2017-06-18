const
    sha1 = require('../helpers/sha1')
    , shortid = require('shortid');

module.exports = (req, res, next) => {

    process.nextTick(() => {

        const {paymentId, selectedPackage, country} = req.body;
        const {name, email, mobile} = req.decodedToken;
        const {
            HOST,
            IPAY_PAYMENT_POST_URL,
            IPAY_MERCHANT_CODE,
            IPAY_MERCHANT_KEY,
            PACKAGE_1_MONTH_RATE,
            PACKAGE_3_MONTH_RATE,
            PACKAGE_6_MONTH_RATE, 
            IPAY_CURRENCY,
            SG_CURRENCY,
            IPAY_RESPONSE_URL, 
            IPAY_BACKEND_URL, 
            PAYPAL_PAYMENT_POST,
            SG_PACKAGE_1_MONTH_RATE,
            SG_PACKAGE_3_MONTH_RATE,
            SG_PACKAGE_6_MONTH_RATE,
            MY_CURRENCY_PREFIX,
            SG_CURRENCY_PREFIX
        } = process.env;

        let
            pricing
            , currency
            , currencyPrefix;
        switch (country) {
            case 'SG':
                pricing = {
                    '1': SG_PACKAGE_1_MONTH_RATE,
                    '3': SG_PACKAGE_3_MONTH_RATE,
                    '6': SG_PACKAGE_6_MONTH_RATE
                };
                currency = SG_CURRENCY;
                currencyPrefix = SG_CURRENCY_PREFIX;
                break;
            default:
                pricing = {
                    '1': PACKAGE_1_MONTH_RATE,
                    '3': PACKAGE_3_MONTH_RATE,
                    '6': PACKAGE_6_MONTH_RATE
                };
                currency = IPAY_CURRENCY;
                currencyPrefix = MY_CURRENCY_PREFIX;
                break;
        }

        const refNo = shortid.generate();
        const amount = Number(pricing[selectedPackage]).toFixed(2);
        const paymentPostUrl = paymentId === 'paypal' ? `${HOST}${PAYPAL_PAYMENT_POST}` : IPAY_PAYMENT_POST_URL;
        req.signature = {
            PaymentPostUrl: paymentPostUrl,
            MerchantCode: IPAY_MERCHANT_CODE,
            PaymentId: paymentId,
            RefNo: refNo,
            Amount: amount,
            Currency: currency,
            ProdDesc: `${selectedPackage}-month signal package`,
            UserName: name,
            UserEmail: email,
            UserContact: mobile,
            Remark: '',
            Signature: sha1(IPAY_MERCHANT_KEY + IPAY_MERCHANT_CODE + refNo + amount.split('.').join('') + currency),
            ResponseUrl: IPAY_RESPONSE_URL,
            BackendUrl: IPAY_BACKEND_URL,
            SignalPackage: Number(selectedPackage),
            CurrencyPrefix: currencyPrefix
        };

        next();

    });
}