const
    express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , validateRegistration = require('../middlewares/validate-registration')
    , validateRecaptcha = require('../middlewares/validate-recaptcha');

router.post('/local/create-account', validateRegistration, validateRecaptcha, passport.authenticate('local-create-account', {session: false}), (req, res, next) => {
    res.json(req.user);
});

module.exports = router;