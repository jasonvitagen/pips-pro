const
    db = require('./mongo')
    , async = require('async');

db.User.find({}, (err, users) => {


    async.eachSeries(users, (user, done) => {
        
        const newMobile = user.mobile.indexOf('60') === 0 ? user.mobile : '6' + user.mobile;

        db.User.findAndModify({
            query: {email: user.email},
            update: {
                $set: {
                    mobile: newMobile
                }
            }
        }, (err, sameUser) => {
            if (err) {
                return done(err);
            }
            done();
        });
    }, (err) => {
        console.log('operation done');
    })
});