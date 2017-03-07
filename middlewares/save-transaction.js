const
    db = require('../setup/mongo');

module.exports = (req, res, next) => {

    const {UserEmail, SignalPackage, MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;

    db.Transaction.insert({
        UserEmail,
        MerchantCode,
        PaymentId,
        RefNo,
        Amount,
        Currency,
        Remark,
        TransId,
        AuthCode,
        Status,
        ErrDesc,
        Signature,
        CreatedAt: new Date().toISOString()
    }, (err) => {
        if (err) {
            return next(err);
        }
    });

    db.User.findOne({email: UserEmail}, (err, user) => {
        if (err) {
            return next(err);
        }
        if (new Date(user.packageExpireAt) > new Date()) {
            console.log('a');
            user.packageExpireAt = new Date(new Date(user.packageExpireAt).setMonth(new Date(user.packageExpireAt).getMonth() + Number(SignalPackage))).toISOString();
        } else {
            console.log('b');
            user.packageExpireAt = new Date(new Date().setMonth(new Date().getMonth() + Number(SignalPackage))).toISOString();
        }
        db.User.findAndModify({
            query: {email: UserEmail},
            update: {
                $set: {
                    packageExpireAt: user.packageExpireAt
                }
            },
            new: true
        }, (err, user) => {
            if (err) {
                return next(err);
            }
        });
    });

    next();
}