const
    express = require('express')
    , app = express()
    , path = require('path')
    , morgan = require('morgan')
    , passport = require('passport')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , authRoute = require('./routes/auth')
    , dotenv = require('dotenv');

require('dotenv').config({path: './process.env'});
require('./setup/passport');

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});