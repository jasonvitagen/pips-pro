const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getPaymentSignature = require('../middlewares/get-payment-signature');

router.post('/signature', validateToken, getPaymentSignature, (req, res, next) => {
    res.json(req.signature);
});

router.post('/response', (req, res, next) => {
    res.send('response');
});

router.post('/backend', (req, res, next) => {
    res.send('backend');
});

module.exports = router;