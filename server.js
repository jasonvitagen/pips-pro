const
    express = require('express')
    , app = express()
    , path = require('path')
    , morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});