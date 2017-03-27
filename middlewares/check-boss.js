module.exports = (req, res, next) => {
    if (req.decodedToken.email === process.env.BOSS_EMAIL) {
        return next();
    } else {
        return next('Not authorized');
    }
}