'use strict'

var mongoApi = require('../database/mongo_api');
var exports = module.exports = {};
var Xray = require('x-ray');
var x = Xray();
var read = require('node-readability');

exports.scrape = function(req, res, link){
	read(link, {}, function(err, article) {
		if(err){
			res.send({});
		}else{
			console.log(article.content);
			if(article.content){
				console.log("content");
				res.send(article.content);
			}else{
				console.log("html");
				res.send(article.html);
			}
			article.close();
		}

	});

	// x(link, 'p', [{paragraph: ''}])(function(err, content) {
	// 	console.log(content);
	//   	res.send(content);
	// });
};
