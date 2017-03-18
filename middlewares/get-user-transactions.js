const
    db = require('../setup/mongo');

module.exports = (req, res, next) => {
    process.nextTick(() => {
        const {email} = req.decodedToken;
        db.Transaction
            .find({UserEmail: email}, {SignalPackage: 1, RefNo: 1, Amount: 1, Currency: 1, TransId: 1, CreatedAt: 1})
            .sort({$natural: -1}, (err, transactions) => {
                if (err) {
                    return next(err);
                }
                req.transactions = transactions;
                next();
            });
    });
}