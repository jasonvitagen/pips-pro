const
    redis = require('../setup/redis')
    , crypto = require('crypto')
    , mailgun = require('../setup/mailgun');

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
                    
                    redis.setex('resetpassword:' + token, process.env.RESET_EMAIL_TTL, req.body.email, (err, reply) => {
                        if (err) {
                            return next(err);
                        }

                        const
                            message = {
                                from: 'Pips-Pro <admin@pips-pro.com>',
                                to: req.body.email,
                                subject: 'Reset Your Password at Pips-Pro.com',
                                html: `
                                    <p>Hi,</p>
                                    <p>We've received a request to reset your password at <a href="${process.env.HOST}">Pips-Pro.com</a></p>
                                    <p>If you didn't make the request, just ignore this message. Otherwise, you can reset your password using this link:</p>
                                    <p><a href="${process.env.HOST}?resetpassword=${token}">Click here to reset your password</a></p>
                                    <p>Thanks,</p>
                                    <p>Pips-Pro</p>
                                `
                            };

                        mailgun.messages().send(message, (err, body) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(body);
                        });

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