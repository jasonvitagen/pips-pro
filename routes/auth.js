const
    express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , validateRegistration = require('../middlewares/validate-registration')
    , validateRecaptcha = require('../middlewares/validate-recaptcha')
    , validateToken = require('../middlewares/validate-token')
    , sendConfirmationEmail = require('../middlewares/send-confirmation-email')
    , cacheSignIn = require('../middlewares/cache-sign-in')
    , checkSignInCache = require('../middlewares/check-sign-in-cache');

router.post('/local/create-account', validateRegistration(), validateRecaptcha, passport.authenticate('local-create-account', {session: false}), cacheSignIn, /*sendConfirmationEmail,*/ (req, res, next) => {
    res.json(req.user.token);
});

router.post('/local/sign-in', checkSignInCache, passport.authenticate('local-sign-in', {session: false}), (req, res, next) => {
    res.json(req.user.token);
});

router.post('/local/edit-account', validateRegistration({skip: {password: 1}}), validateToken, passport.authenticate('local-edit-account', {session: false}), (req, res, next) => {
    res.json(req.user.token);
});

router.post('/local/change-password', validateRegistration({skip: {email: 1, mobile: 1, name: 1, recaptcha: 1}}), validateToken, passport.authenticate('local-change-password', {session: false}), cacheSignIn, (req, res, next) => {
    res.json(req.user.token);
})

module.exports = router;