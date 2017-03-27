const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getActiveCustomers = require('../middlewares/get-active-customers')
    , checkBoss = require('../middlewares/check-boss');

router.get('/active-customers', validateToken, checkBoss, getActiveCustomers, (req, res, next) => {

});

module.exports = router;