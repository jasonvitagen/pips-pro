const
    axios = require('axios');
let
    channel;

require('amqplib').connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(ch => {
        channel = ch;
        return ch.assertQueue('payments');
    })
    .then(() => {
        channel.consume('payments', msg => {
            if (msg) {
                axios.post(`${process.env.HOST}payment/process-queued-payments`, JSON.parse(msg.content.toString()))
                    .then(response => {
                        if (response.data === 'payment ok') {
                            channel.ack(msg);
                        }
                    })
                    .catch(console.error);
            }
        });
    });