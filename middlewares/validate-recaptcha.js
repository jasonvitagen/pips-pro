const
    axios = require('axios')
    , querystring = require('querystring');

module.exports = (req, res, next) => {


    axios.post('https://www.google.com/recaptcha/api/siteverify', querystring.stringify({
        secret: process.env.RECAPTCHA_SECRET,
        response: req.body.recaptcha,
        remoteip: req.ip
    })).then(response => {
        if (!response.data.success) {
            return next('Invalid recaptcha');
        }
        next();
    }).catch(err => {
        return next(err);
    });


}