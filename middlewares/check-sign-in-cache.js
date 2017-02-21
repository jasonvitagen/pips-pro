const
    redis = require('../setup/redis')
    , bcrypt = require('bcrypt-nodejs');

module.exports = (req, res, next) => {

    redis.get('user:' + req.body.email, (err, password) => {
        if (err) {
            return next(err);
        }
        if (!password) {
            return next('Invalid username or password');
        }
        if (!bcrypt.compareSync(req.body.password, password)) {
            return next('Invalid username or password');
        }

        next();
    });

};