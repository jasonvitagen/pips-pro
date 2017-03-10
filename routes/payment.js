const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getPaymentSignature = require('../middlewares/get-payment-signature')
    , checkPaymentResponseSignature = require('../middlewares/check-payment-response-signature')
    , sendOrderSuccessEmail = require('../middlewares/send-order-success-email')
    , saveReference = require('../middlewares/save-reference')
    , checkReference = require('../middlewares/check-reference')
    , saveTransaction = require('../middlewares/save-transaction')
    , savePaymentsToQueue = require('../middlewares/save-payments-to-queue');

router.post('/signature', validateToken, getPaymentSignature, saveReference, (req, res, next) => {
    res.json(req.signature);
});

router.post('/response', checkPaymentResponseSignature, checkReference, (req, res, next) => {
    console.log('response payment ok');
    res.send('payment ok');
});

router.post('/process-queued-payments', checkReference, saveTransaction, /*sendOrderSuccessEmail,*/ (req, res, next) => {
    console.log('backend payment ok');
    res.send('payment ok');
});

router.post('/backend', checkPaymentResponseSignature, savePaymentsToQueue, (req, res, next) => {
    res.send('RECEIVEOK');
});

module.exports = router;