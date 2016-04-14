'use strict'

var mongoApi = require('../database/mongo_api');
var exports = module.exports = {};

exports.readNews = function(tableName, res){
	var promise = new Promise(function(resolve, reject){
		mongoApi.readNews(tableName, resolve, reject);
	});

	promise.then(function(val){
		//send news data 
		res.send(val);
	}).catch(function(){
		//if reject send empty obj
		res.send({});
	});
	
};