const
    mongojs = require('mongojs')
    , db = mongojs('localhost:27017/pipspro', ['User']);

module.exports = db;