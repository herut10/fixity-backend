'use strict'
var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    const url = 'mongodb://fixity-team:qwerty1234@ds247101.mlab.com:47101/fixity_db'
    
    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');

            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connectToMongo
}