'use strict'

var mongoClient = require('mongodb').MongoClient;
var pmongo = require('promised-mongo').compatible();
var urls = require('../util/url');
var exports = module.exports = {};

/**
* insert data into db
*/
exports.insertNews = function(data, parentKey, childKey){
	mongoClient.connect(urls.URL.mongo_base, function(err, db){
		var tableName = parentKey+"_"+childKey;
		insertCollection(data, tableName, db);
	});
};

var insertCollection = function(data, tableName, db){
	var collection = db.collection(tableName);
	if(typeof data === 'string'){
		data = JSON.parse(data);
	}
	//first drop the collection no matter exist or not
	collection.drop();
	console.log("insert db "+tableName);
	collection.insert(data,function(){
        console.log("Successfully inserted "+tableName);
    });
};

exports.readNews = function(tableName, resolve, reject){
	mongoClient.connect(urls.URL.mongo_base, function(err, db){
		readCollection(tableName, db, resolve, reject);
	});
};

var readCollection = function(tableName, db, resolve, reject){
	var collection = db.collection(tableName);

    collection.find({}).toArray(function(err, docs){
    	if(err){
    		reject();
    	}
    	resolve(docs);
    });
};