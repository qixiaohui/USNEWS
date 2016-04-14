(function(){
	'use strict'
	var express = require('express');
	var rateLimit = require('express-rate-limit');
	var app = express();
	var bodyParser = require('body-parser');
	var compress = require('compression');
	var cors = require('cors');
	var logger = require('morgan');
	var port = 2000;
	var fetcher = require('./dao/news_fetcher');
	var reader = require('./dao/news_reader');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(compress());
	app.use(cors());
	app.use(logger('dev'));
	app.enable('trust proxy');

	var limitter = rateLimit({});
	var readNews = function(req, res){
		console.log("news reader");
		reader.readNews(req.params.tablename, res);
	};

	app.use(limitter);

	app.use(cors());

	app.get('/news/:tablename', readNews);

	app.listen(port, function(){
		console.log("server listening on port: "+port);
	});

	//here fetch news when the app first launch
	//fetcher.fetchNews();
})()