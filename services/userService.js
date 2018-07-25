'use strict'
const ObjectId = require('mongodb').ObjectId;

function query() {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.find({}).toArray()
        })
}

function remove(userId) {
    userId = new ObjectId(userId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.remove({
                _id: userId
            })
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.findOne({
                _id: userId
            })
        })
}

function add(user) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.insertOne(user)
                .then(result => {
                    user._id = result.insertedId;
                    delete user.password
                    return user;
                })
        })
}

function update(user) {
    user._id = new ObjectId(user._id)
    return connectToMongo()

        .then(db => {
            const collection = db.collection('user');
            return collection.updateOne({
                    _id: user._id
                }, {
                    $set: user
                })
                .then(result => {
                    return user;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}