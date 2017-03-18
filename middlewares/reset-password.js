const
    redis = require('../setup/redis')
    , db = require('../setup/mongo')
    , bcrypt = require('bcrypt-nodejs');

module.exports = (req, res, next) => {
    process.nextTick(() => {

        const
            {resetPasswordToken, password, confirmPassword} = req.body
            , keyResetPassword = 'resetpassword:' + resetPasswordToken;

        redis.get(keyResetPassword, (err, userEmail) => {
            if (err) {
                return next(err);
            }
            if (!userEmail) {
                return next('wrong reset password token');
            }
            db.User.findAndModify({
                query: {'email': userEmail},
                update: {
                    $set: {
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
                redis.del(keyResetPassword);
                req.user = user;
                return next();
            });
        });

    });
}