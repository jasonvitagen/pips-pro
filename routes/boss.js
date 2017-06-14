const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getActiveCustomers = require('../middlewares/get-active-customers')
    , sendSignal = require('../middlewares/send-signal')
    , checkBoss = require('../middlewares/check-boss');

router.get('/active-customers', validateToken, checkBoss, getActiveCustomers, (req, res, next) => {
    res.json(req.users);
});

router.post('/send-signal', validateToken, checkBoss, getActiveCustomers, sendSignal);

module.exports = router;