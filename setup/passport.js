const
    passport = require('passport')
    , LocalStrategy = require('passport-local');

passport.use('local-create-account', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    console.log('cvxcv');
    return done(null, {username, name: req.body.name});
}));