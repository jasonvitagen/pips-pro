const
    sha1 = require('../helpers/sha1');

module.exports = (req, res, next) => {

    process.nextTick(() => {


        const {IPAY_MERCHANT_CODE, IPAY_MERCHANT_KEY} = process.env;
        const {MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;
        const ourSignature = sha1(IPAY_MERCHANT_KEY + IPAY_MERCHANT_CODE + PaymentId + RefNo + Amount.split('.').join('') + Currency + Status);
        
        if (!Status || Status === '0') {
            req.failedStatus = true;
        }

        if (ourSignature !== Signature) {
            req.failedSignature = true;
        }

        next();

    });

}