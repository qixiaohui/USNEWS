'use strict'

var mongoApi = require('../database/mongo_api');
var exports = module.exports = {};
var Xray = require('x-ray');
var x = Xray();
var read = require('node-readability');

exports.scrape = function(req, res, link, id){
	read(link, {}, function(err, article) {
		if(err){
			res.send({});
		}else{
			if(article.content){
				mongoApi.insertContent(article.content, id);
				res.send([{content: article.content}]);
			}else{
				mongoApi.insertContent(article.html, id);
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
