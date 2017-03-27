const
    db = require('../setup/mongo')

module.exports = (req, res, next) => {
    db.User.find({packageExpireAt: {$gt: new Date()}}, (err, users) => {
        if (err) {
            return console.log(err);
        }
        res.json(users);
    });
}