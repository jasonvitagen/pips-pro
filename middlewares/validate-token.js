const
    jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


    const token = req.get('Authorization');

    if (!token) {
        return next('Not authorized');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(err);
        }

        req.decodedToken = decoded;
        next();
    });


}