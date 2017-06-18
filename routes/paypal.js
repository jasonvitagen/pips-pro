const
    express = require('express')
    , router = express.Router()
    , createPaypalPayment = require('../middlewares/create-paypal-payment')
    , executePaypalPayment = require('../middlewares/execute-paypal-payment')
    , processPaypalPaymentResponse = require('../middlewares/process-paypal-payment-response')
    , savePaymentsToQueue = require('../middlewares/save-payments-to-queue');

router.post('/create', createPaypalPayment);

router.get('/execute', executePaypalPayment);

router.post('/response', processPaypalPaymentResponse, savePaymentsToQueue);

module.exports = router;