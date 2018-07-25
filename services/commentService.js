'use strict';
const mongoService = require('./mongoService')

function query() {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.find({}).toArray()
        })
}


function add(comment) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.insertOne(comment)
                .then(result => {
                    comment._id = result.insertedId;
                    return comment;
                })
        })
}


module.exports = {
    query,
    add
}