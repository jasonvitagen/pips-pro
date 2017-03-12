const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getPaymentSignature = require('../middlewares/get-payment-signature')
    , checkPaymentResponseSignature = require('../middlewares/check-payment-response-signature')
    , checkPaymentBackendSignature = require('../middlewares/check-payment-backend-signature')
    , sendOrderSuccessEmail = require('../middlewares/send-order-success-email')
    , saveReference = require('../middlewares/save-reference')
    , checkReference = require('../middlewares/check-reference')
    , saveTransaction = require('../middlewares/save-transaction')
    , savePaymentsToQueue = require('../middlewares/save-payments-to-queue');

router.post('/signature', validateToken, getPaymentSignature, saveReference, (req, res, next) => {
    res.json(req.signature);
});

router.post('/response', checkPaymentResponseSignature, checkReference, (req, res, next) => {
    const {RefNo} = req.body;
    if (req.failedStatus || req.failedSignature) {
        res.redirect(301, `${process.env.HOST}payment-status-nok.html`);
    } else {
        res.redirect(301, `${process.env.HOST}payment-status-ok.html?RefNo=${RefNo}`);
    }
});

router.post('/process-queued-payments', checkReference, saveTransaction, sendOrderSuccessEmail, (req, res, next) => {
    console.log('backend payment ok');
    res.send('payment ok');
});

router.post('/backend', checkPaymentBackendSignature, savePaymentsToQueue, (req, res, next) => {
    res.send('RECEIVEOK');
});

module.exports = router;