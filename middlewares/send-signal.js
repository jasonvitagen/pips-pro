const
    axios = require('axios')
    , querystring = require('querystring');

module.exports = (req, res, next) => {

    const {ISMS_USERNAME, ISMS_PASSWORD} = process.env;
    const users = req.users.map(user => {
        return user.mobile.charAt(0) !== '6' ? '6' + user.mobile : user.mobile;
    }).join(';');
    axios.post('https://www.isms.com.my/isms_send.php', querystring.stringify({
        un: ISMS_USERNAME,
        pwd: ISMS_PASSWORD,
        type: 1,
        dstno: users,
        msg: req.body.payload
    })).then(response => {
        res.json({
            data: response.data
        });
    });

}