const
    express = require('express')
    , app = express()
    , path = require('path')
    , morgan = require('morgan')
    , passport = require('passport')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , authRoute = require('./routes/auth')
    , paymentRoute = require('./routes/payment')
    , myAccountRoute = require('./routes/my-account')
    , bossRoute = require('./routes/boss')
    , jsonRoute = require('./routes/json');
    
require('dotenv').config({path: require('path').join(__dirname, './process.env')});
require('./setup/passport');
require('./setup/sync-sign-in-cache');
require('./setup/process-payments');
require('./setup/notify-expired-users');

app.set('trust proxy', 'loopback');

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/payment', paymentRoute);
app.use('/my-account', myAccountRoute);
app.use('/boss', bossRoute);
app.use('/json', jsonRoute);

app.use(express.static(path.join(__dirname, 'public')));


app.use((err, req, res, next) => {
    res
        .status(500)
        .send(err);
});

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});