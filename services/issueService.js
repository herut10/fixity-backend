'use strict'
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;

function query(getBy) {
    var getBy=JSON.parse(getBy)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('issue');
            return collection.find(getBy).toArray()
        })
}

function remove(issueId) {
    issueId = new ObjectId(issueId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('issue');
            return collection.remove({ _id: issueId })
        })
}

function getById(issueId) {
    issueId = new ObjectId(issueId)
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('issue');
            return collection.findOne({ _id: issueId })
        })
}

function add(issue) {
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('issue');
            return collection.insertOne(issue)
                .then(result => {
                    issue._id = result.insertedId;
                    return issue;
                })
        })
}

function update(issue) {
    issue._id = new ObjectId(issue._id)
    return mongoService.connectToMongo()

        .then(db => {
            const collection = db.collection('issue');
            return collection.updateOne({
                    _id: issue._id
                }, {
                    $set: issue
                })
                .then(result => {
                    return issue;
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