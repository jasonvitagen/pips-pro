const
    express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , validateRegistration = require('../middlewares/validate-registration');

router.post('/local/create-account', validateRegistration, passport.authenticate('local-create-account', {session: false}), (req, res, next) => {
    res.json(req.user);
});

module.exports = router;