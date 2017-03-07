const
    redis = require('redis')
    , client = redis.createClient();

client.on('ready', () => {
    console.log('Redis is ready');
});

client.on('reconnecting', () => {
    console.log('Redis is reconnecting');
});

client.on('error', err => {
    console.log(err);
});

module.exports = client;