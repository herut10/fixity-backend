'use strict'
//test
const ObjectId = require('mongodb').ObjectId;

function query() {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.find({}).toArray()
        })
}

function remove(commentId) {
    commentId = new ObjectId(commentId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.remove({ _id: commentId })
        })
}
function getById(commentId) {
    commentId = new ObjectId(commentId)
    return connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.findOne({ _id: commentId })
        })
}

function add(comment) {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.insertOne(comment)
                .then(result => {
                    comment._id = result.insertedId;
                    return comment;
                })
        })
}

function update(comment) {
    comment._id = new ObjectId(comment._id)
    return connectToMongo()

        .then(db => {
            const collection = db.collection('comment');
            return collection.updateOne({ _id: comment._id }, { $set: comment })
                .then(result => {
                    return comment;
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