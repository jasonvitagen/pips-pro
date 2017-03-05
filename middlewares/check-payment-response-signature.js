const
    sha1 = require('../helpers/sha1');

module.exports = (req, res, next) => {
    const {IPAY_MERCHANT_CODE, IPAY_MERCHANT_KEY} = process.env;
    const {MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;
    console.log(MerchantCode);
    console.log(PaymentId);
    console.log(RefNo);
    console.log(Amount);
    console.log(Currency);
    console.log(Remark);
    console.log(TransId);
    console.log(AuthCode);
    console.log(Status);
    console.log(ErrDesc);
    console.log(Signature);
    const ourSignature = sha1(IPAY_MERCHANT_KEY + IPAY_MERCHANT_CODE + PaymentId + RefNo + Amount.split('.').join('') + Currency + Status);
    console.log(ourSignature);

    if (!Status || Status === '0') {
        console.log('payment failed');
        return next('Payment failed ' + ErrDesc);
    }

    if (ourSignature === Signature) {
        return next();
    }

}