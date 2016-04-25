'use strict'

var mongoApi = require('../database/mongo_api');
var urls = require('../util/url');
var request  = require('request');
var exports = module.exports = {};

exports.readNews = function(tableName, res){
	var promise = new Promise(function(resolve, reject){
		request(urls.URL.baseUrl+tableName+urls.URL.apiKey, function(error, response, body){
			if(!error && response.statusCode === 200){
				resolve(response.body);
			}else{
				reject();
			}
		});
	});

	promise.then(function(val){
		//send news data 
		res.send(val);
	}).catch(function(){
		//if reject send empty obj
		res.send({});
	});
	
};