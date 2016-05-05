'use strict'

var mongoApi = require('../database/mongo_api');
var urls = require('../util/url');
var request  = require('request');
var exports = module.exports = {};

exports.readNews = function(tableName, pagination, language, callback){
	if(tableName === 'trending'){
		tableName = "";
	}

	if(['zh-CN', 'zh-TW', 'zh'].indexOf(language) > -1){
		language = '&l=zh';
	}else{
		language = '&l=en';
	}
	console.log(encodeURI(urls.URL.baseUrl+tableName+urls.URL.apiKey+urls.URL.pagination+pagination+language));
	var promise = new Promise(function(resolve, reject){
		request(encodeURI(urls.URL.baseUrl+tableName+urls.URL.apiKey+urls.URL.pagination+pagination+language), function(error, response, body){
			if(!error && response.statusCode === 200){
				resolve(response.body);
			}else{
				reject();
			}
		});
	});

	promise.then(function(val){
		//send news data 
		callback(null, JSON.parse(val));
	}).catch(function(){
		//if reject send empty obj
		callback(null, {});
	});
	
};