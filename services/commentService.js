'use strict';


function query() {
    return connectToMongo()
        .then(db => {
            const collection = db.collection('comment');
            return collection.find({}).toArray()
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


module.exports = {
    query,
    add
}