const
    transporter = require('../setup/nodemailer');

module.exports = (req, res, next) => {

    const
        message = {
            from: 'admin@pips-pro.com',
            to: req.user.email,
            subject: 'Registration at Pips-Pro.com',
            text: `Thank you ${req.user.name} ${req.user.mobile} for registering.`
        };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log(info);
    });

    next();

}