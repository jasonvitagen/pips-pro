let
    channel;

require('amqplib').connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(ch => {
        channel = ch;
        return ch.assertQueue('payments');
    });

module.exports = (req, res, next) => {
    channel.sendToQueue('payments', new Buffer(JSON.stringify(req.body)), {persistent: true});
    next();
}