// import the mongodb module
var mongodb = require('mongodb');

// use the MongoClient class
MongoClient = mongodb.MongoClient;

// define the mongodb connection url
const mongoConnectUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_XDEV

module.exports = (dbTask) => {
    if(typeof dbTask !== 'function') throw new TypeError(`first argument dbTask must be a function(err, db), ${typeof dbTask} found`);
    // create a mongo client to perform a database task
    var client = MongoClient.connect(mongoConnectUrl, dbTask);
};
