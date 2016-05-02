'use strict'

var mongoApi = require('../database/mongo_api');
var exports = module.exports = {};
var Xray = require('x-ray');
var x = Xray();
var read = require('node-readability');
var worker = require('webworker-threads').Worker;

exports.scrape = function(req, res, link, id){
	var scraper = new worker(function(){
		this.onmessage = function(event){
			postMessage(
				read(link, {}, function(err, article) {
					if(err){
						res.send({});
					}else{
						if(article.content){
							mongoApi.insertContent(article.content, id);
							article.close();
							return [{content: article.content}];
						}else{
							mongoApi.insertContent(article.html, id);
							article.close();
							return [{content: article.html}];
						}
					}

				})
			);
		};
	});

	scraper.onmessage = function(event){
		res.send(event.data);
	};

	scraper.post();

	// x(link, 'p', [{paragraph: ''}])(function(err, content) {
	// 	console.log(content);
	//   	res.send(content);
	// });
};
