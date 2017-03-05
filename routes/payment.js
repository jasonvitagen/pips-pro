const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getPaymentSignature = require('../middlewares/get-payment-signature')
    , checkPaymentResponseSignature = require('../middlewares/check-payment-response-signature')
    , sendOrderSuccessEmail = require('../middlewares/send-order-success-email');

router.post('/signature', validateToken, getPaymentSignature, (req, res, next) => {
    res.json(req.signature);
});

router.post('/response', checkPaymentResponseSignature, (req, res, next) => {
    console.log('response payment ok');
    res.send('payment ok');
});

router.post('/backend', checkPaymentResponseSignature, sendOrderSuccessEmail, (req, res, next) => {
    console.log('backend payment ok');
    res.send('payment ok');
});

module.exports = router;