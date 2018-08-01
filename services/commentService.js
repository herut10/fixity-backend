'use strict';
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;


function query(getBy) {
    const criteria=JSON.parse(getBy);
    if(criteria.commenterId) criteria.commenterId = new ObjectId(criteria.commenterId);
    console.log(criteria);
    
    return mongoService.connectToMongo()
        .then(db => {
            return db.collection('comment')
                .aggregate([
                    {
                        $match: criteria
                    },
                    {
                        $lookup:
                        {
                            from: 'user',
                            localField: 'commenterId',
                            foreignField: '_id',
                            as: 'commenter'
                        }
                    },
                    {$unwind: {
                        path :'$commenter', 
                        preserveNullAndEmptyArrays: true}
                    },
                ]).toArray()
        })
}


function add(comment) {
    comment.commenterId = new ObjectId(comment.commenterId);
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

function remove(deleteBy) {
    var deleteBy=JSON.parse(deleteBy)
    if(deleteBy._id) deleteBy._id = new ObjectId(deleteBy._id);
    return mongoService.connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.deleteMany(deleteBy)
        });
}


module.exports = {
    query,
    add,
    remove,
}