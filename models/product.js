const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        let dbOp; //database operation
        if (this._id) {
            //if there is exsisting id, update product
            dbOp = db
            .collection('products')
            .updateOne({_id: this._id}, { $set: this });
        } else {
            //id doesn't exsist, create new
            dbOp = db
            .collection('products')
            .insertOne(this)
        }
        return dbOp
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    static fetchALL() {
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });
    }
    static findById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .deleteOne({ _id: new mongodb.ObjectId(prodId)})
        .then(result => { 
            console.log('Deleted')
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = Product;