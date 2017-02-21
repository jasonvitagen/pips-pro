const
    db = require('./mongo')
    , redis = require('./redis')
    , async = require('async');

db.User.find({}, (err, users) => {

    redis.keys('user:*', (err, replies) => {
        async.each(replies, (reply, done) => {
            redis.del(reply, (err) => done(err));
        }, (err) => {
            if (err) {
                console.log('sign in cache sync error');
                return;
            }
            async.each(users, (user, done) => {
                redis.set('user:' + user.email, user.password, (err) => done(err));
            }, (err) => {
                if (err) {
                    console.log('sign in cache sync error');
                    return;
                }
                console.log('sign in cache synced');
            });
        });
    });

});