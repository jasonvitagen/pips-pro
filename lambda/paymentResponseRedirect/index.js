const sha256 = require('./helpers/sha256');
const queryString = require('query-string');

exports.handler = async (event, context) => {
    const reqBody = queryString.parse(event.body);

    const {IPAY_MERCHANT_CODE, IPAY_MERCHANT_KEY} = process.env;
    const {
        MerchantCode,
        PaymentId,
        RefNo,
        Amount,
        Currency,
        Remark,
        TransId,
        AuthCode,
        Status,
        ErrDesc,
        Signature
    } = reqBody;

    const ourSignature = sha256(
        IPAY_MERCHANT_KEY +
            IPAY_MERCHANT_CODE +
            PaymentId +
            RefNo +
            Amount.replace(/[,.]/g, '') +
            Currency +
            Status
    );

    console.log(reqBody);

    let response = {
        statusCode: 301,
        headers: {
            'Access-Control-Allow-Origin': '*',
            Location: `${process.env.HOST}payment-status-nok.html`
        }
    };

    if (Status === '1' && ourSignature === Signature) {
        response.headers.Location = `${
            process.env.HOST
        }payment-status-ok.html?RefNo=${RefNo}`;
    }

    return response;
};
