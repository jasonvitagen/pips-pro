const
    redis = require('../setup/redis');

module.exports = (req, res, next) => {
    const {RefNo} = req.body;
    redis.hgetall(`reference:${RefNo}`, (err, reply) => {
        if (err) {
            return next(err);
        }
        req.body.UserEmail = reply.UserEmail;
        req.body.SignalPackage = reply.SignalPackage; 
        next();
    });
}