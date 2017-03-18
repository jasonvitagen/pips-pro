const
    redis = require('../setup/redis')
    , crypto = require('crypto');

module.exports = (req, res, next) => {
    process.nextTick(() => {

        const
            keyUser = 'user:' + req.body.email
            , keyForgotPassword = 'forgotpassword:' + req.body.email;

        redis.get(keyUser, (err, password) => {
            if (err) {
                return next(err);
            }
            if (!password) {
                return next();
            }

            redis.bitcount(keyForgotPassword, (err, count) => {
                if (err) {
                    return next(err);
                }
                if (count > process.env.FORGOT_PASSWORD_MAX) {
                    return next();
                }

                crypto.randomBytes(32, (err, buffer) => {
                    const token = buffer.toString('hex');
                    
                    redis.setex('resetemail:' + req.body.email, process.env.RESET_EMAIL_TTL, token, (err, reply) => {
                        if (err) {
                            return next(err);
                        }

                        redis.setbit(keyForgotPassword, count++, 1, (err, reply) => {
                            if (err) {
                                return next(err);
                            }
                            
                            redis.pttl(keyForgotPassword, (err, reply) => {
                                if (err) {
                                    return next(err);
                                }

                                if (reply === -1) {
                                    redis.expire(keyForgotPassword, process.env.FORGOT_PASSWORD_TTL);
                                }

                                next();
                            })
                        })
                    });

                });

            });

        });

    });
}