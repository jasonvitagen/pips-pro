const
    redis = require('../setup/redis');

module.exports = (req, res, next) => {
    const {RefNo, UserEmail, SignalPackage} = req.signature;
    const referenceTTL = process.env.REFERENCE_TTL;
    redis.hmset(`reference:${RefNo}`, 'UserEmail', UserEmail, 'SignalPackage', SignalPackage, (err, reply) => {
        if (err) {
            return next(err);
        }
        next();
    });
    redis.expire(`reference:${RefNo}`, process.env.REFERENCE_TTL);
}