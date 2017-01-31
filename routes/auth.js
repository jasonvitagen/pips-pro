const
    express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , validateRegistration = require('../middlewares/validate-registration')
    , validateRecaptcha = require('../middlewares/validate-recaptcha')
    , validateToken = require('../middlewares/validate-token');

router.post('/local/create-account', validateRegistration, validateRecaptcha, passport.authenticate('local-create-account', {session: false}), (req, res, next) => {
    res.json(req.user);
});

router.post('/local/sign-in', passport.authenticate('local-sign-in', {session: false}), (req, res, next) => {
    res.json(req.user);
});

router.post('/local/edit-account', validateRegistration, validateToken, passport.authenticate('local-edit-account', {session: false}), (req, res, next) => {
    res.json(req.user);
});

module.exports = router;