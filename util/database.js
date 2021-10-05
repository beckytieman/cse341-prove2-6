const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//used internally
let _db;

//connnection to cluster on mongodb
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://tieman-user_OG:Sti8WMGOLgxW5AyD@cluster0.k9l5x.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;