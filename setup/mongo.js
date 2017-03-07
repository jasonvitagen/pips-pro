const
    mongojs = require('mongojs')
    , db = mongojs('localhost:27017/pipspro', ['User', 'Transaction']);

module.exports = db;