'use strict'
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.find({}).toArray()
        })
}

function remove(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.remove({
                _id: userId
            })
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('user');
            return collection.findOne({
                _id: userId
            })
        })
}

function add(user) {
    return mongoService.connectToMongo()
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
    return mongoService.connectToMongo()

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