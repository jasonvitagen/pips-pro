const
    mongo = new Mongo()
    , db = mongo.getDB('pipspro');

db.User.dropIndexes();
db.User.createIndex({ 'email' : 1 }, { unique : true });

db.Transaction.dropIndexes();
db.Transaction.createIndex({ 'UserEmail' : 1 });