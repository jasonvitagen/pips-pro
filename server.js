const
    express = require('express')
    , app = express()
    , path = require('path')
    , morgan = require('morgan')
    , passport = require('passport')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , authRoute = require('./routes/auth')
    , paymentRoute = require('./routes/payment');

require('dotenv').config({path: require('path').join(__dirname, './process.env')});
require('./setup/passport');
require('./setup/sync-sign-in-cache');

app.set('trust proxy', 'loopback');

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}}));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/payment', paymentRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((err, req, res, next) => {
    res
        .status(500)
        .send(err);
});

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});