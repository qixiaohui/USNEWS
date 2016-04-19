'use strict'

var request  = require('request');
var fs = require('fs');
var _ = require('underscore');
var urls = require('../util/url');
var async = require('async');
var mongoApi = require('../database/mongo_api');

var fetchNews = function(){
	var funcStack = [];
	// parent key: sports etc childKey: nba
	var callback = function(result, parentKey, childKey){
		mongoApi.insertNews(result, parentKey, childKey);
	}

	_.each(urls.URL.urls, function(value, parentKey, list){
		_.each(urls.URL.urls[parentKey], function(value, childKey, list){
			var func = function(callBack){
				//here we get the url
				var url = value;
				setTimeout(function(){
					console.log("request url"+url);
					request(url, function(error, response, body){
						if(!error && response.statusCode === 200){
							console.log("response"+JSON.parse(body));
							callback(JSON.parse(body), parentKey, childKey);
						}
					});
				}, 3000);
			};

			funcStack.push(func);
		});
	});

	async.parallel(funcStack, callback);
};

module.exports.fetchNews = fetchNews;