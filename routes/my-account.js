const
    express = require('express')
    , router = express.Router()
    , validateToken = require('../middlewares/validate-token')
    , getUserTransactions = require('../middlewares/get-user-transactions');

router.get('/transactions', validateToken, getUserTransactions, (req, res, next) => {
    res.json(req.transactions);
});

module.exports = router;