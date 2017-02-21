const
    redis = require('../setup/redis');

module.exports = (req, res, next) => {

    redis.set('user:' + req.user.email, req.user.password, (err) => {
        if (err) {
            return next(err);
        }
        next();
    });

};