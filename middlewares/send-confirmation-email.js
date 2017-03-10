const
    transporter = require('../setup/nodemailer');

module.exports = (req, res, next) => {
    process.nextTick(() => {
    
        const
            message = {
                from: 'admin@pips-pro.com',
                to: req.body.email,
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

    });

}