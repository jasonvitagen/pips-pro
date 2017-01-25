const
    passport = require('passport')
    , LocalStrategy = require('passport-local')
    , db = require('./mongo')
    , bcrypt = require('bcrypt-nodejs')
    , jwt = require('jsonwebtoken');

passport.use('local-create-account', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    process.nextTick(() => {

        const {name} = req.body;

        db.User.findOne({ 'email' : email }, { 'password' : 0 }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done('Email exists, try another email');
            }

            const newUser = {
                name,
                email,
                password: bcrypt.hashSync(password)
            };

            db.User.insert(newUser, (err, result) => {
                if (err) {
                    return done(err);
                }
                jwt.sign({name, email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY}, (err, token) => {
                    if (err) {
                        return done(err);
                    }
                    done(null, token);
                });
            })
        });
    });
}));