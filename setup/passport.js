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

        const {name, mobile} = req.body;

        db.User.findOne({ 'email' : email }, { 'password' : 0 }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done('Email exists, try another email');
            }

            const newUser = {
                name,
                mobile,
                email,
                password: bcrypt.hashSync(password)
            };

            db.User.insert(newUser, (err, result) => {
                if (err) {
                    return done(err);
                }
                jwt.sign({name, mobile, email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY}, (err, token) => {
                    if (err) {
                        return done(err);
                    }
                    done(null, token);
                });
            })
        });
    });
}));


passport.use('local-edit-account', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    process.nextTick(() => {

        const 
            {name, mobile} = req.body
            , {email: decodedEmail} = req.decodedToken;

        db.User.findAndModify({
            query: {'email': decodedEmail},
            update: {
                $set: {
                    name,
                    mobile,
                    password: bcrypt.hashSync(password)
                }
            },
            new: true
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done('User does not exist');
            }
            const {name: userName, mobile: userMobile} = user;
            jwt.sign({name: userName, mobile: userMobile, email: decodedEmail}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY}, (err, token) => {
                if (err) {
                    return done(err);
                }
                return done(null, token);
            });
        });


    });
}));


passport.use('local-sign-in', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    process.nextTick(() => {

        db.User.findOne({ 'email' : email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                const {name, mobile, password: userPassword} = user;
                if (bcrypt.compareSync(password, userPassword)) {
                    return jwt.sign({name, mobile, email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY}, (err, token) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, token);
                    });
                }
            }
            return done('Invalid username or password');
        });

    });
}));