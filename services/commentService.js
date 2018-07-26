'use strict';
const mongoService = require('./mongoService')
const ObjectId = require('mongodb').ObjectId;


function query(issue) {
    const criteria = { issueId: issue };
    
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
                    }
                ]).toArray()
        })



    // var type = params.type;
    // var id = params.id;  
    // if(type === 'issue') {
    //     return mongoService.connectToMongo()
    //     .then(db => {
    //         const collection = db.collection('comment');
    //         return collection.find({issueId: id}).toArray()
    //     });
    // } else {
    //     return mongoService.connectToMongo()
    //     .then(db => {
    //         const collection = db.collection('comment');
    //         return collection.find({commenterId: id}).toArray()
    //     });
    // }      
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


module.exports = {
    query,
    add
}