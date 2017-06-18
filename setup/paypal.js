console.log(process.env.PAYPAL_WEBHOOK_URL)
const
    paypal = require('paypal-rest-sdk')
    , {PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_SECRET} = process.env;

paypal.configure({
    mode: PAYPAL_MODE,
    client_id: PAYPAL_CLIENT_ID,
    client_secret: PAYPAL_SECRET
});