const
    db = require('../setup/mongo')
    , async = require('async');

module.exports = (req, res, next) => {

    const {UserEmail, SignalPackage, MerchantCode, PaymentId, RefNo, Amount, Currency, Remark, TransId, AuthCode, Status, ErrDesc, Signature} = req.body;

    async.parallel([
        (done) => {
            db.Transaction.insert({
                UserEmail,
                SignalPackage,
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
                CreatedAt: new Date()
            }, (err) => {
                if (err) {
                    return next(err);
                }
                done();
            });
        },
        (done) => {
            db.User.findOne({email: UserEmail}, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (new Date(user.packageExpireAt) > new Date()) {
                    user.packageExpireAt = new Date(new Date(user.packageExpireAt).setMonth(new Date(user.packageExpireAt).getMonth() + Number(SignalPackage)));
                } else {
                    user.packageExpireAt = new Date(new Date().setMonth(new Date().getMonth() + Number(SignalPackage)));
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
                    req.body.packageExpireAt = user.packageExpireAt;
                    done();
                });
            });
        }
    ], (err, results) => {
        if (err) {
            return next(err);
        }
        next();
    });
}