(function(){
	'use strict'
	var express = require('express');
	//var rateLimit = require('express-rate-limit');
	var app = express();
	var schedule = require('node-schedule');
	var bodyParser = require('body-parser');
	var compress = require('compression');
	var cors = require('cors');
	var logger = require('morgan');
	var port = 2000;
	var fetcher = require('./dao/news_fetcher');
	var reader = require('./dao/news_reader');
	var scraper = require('./dao/news_scraper');
	var mongoApi = require('./database/mongo_api');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(compress());
	app.use(cors());
	app.use(logger('dev'));
	app.enable('trust proxy');

	//var limitter = rateLimit({});
	var readNews = function(req, res){
		console.log("news reader");
		reader.readNews(req.params.tablename, res);
	};

	var scraping = function(req, res){
		//get the link from header
		var link = req.headers.link;
		var id = req.headers.id;
		var promise = new Promise(function(resolve, reject){
			mongoApi.queryCollection(resolve, reject, id);
		});

		promise.then(function(){
			reader.readNews(id, res);
		}).catch(function(){
			scraper.scrape(req, res, link, id);
		});

	};

	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [new schedule.Range(0, 6)];
	rule.hour = 0;
	rule.minute = 30;

    schedule.scheduleJob(rule, function(){
  		mongoApi.cleanDB();
	});

	var yetAnotherRule = new schedule.RecurrenceRule();
	yetAnotherRule.hour = 4;

	schedule.scheduleJob(yetAnotherRule, function(){
  		fetcher.fetchNews();
	});

	//app.use(limitter);

	app.use(cors());

	app.get('/news/:tablename', readNews);

	app.get('/content', scraping);

	app.use(express.static('./client/bower_components/'));

	app.use(express.static('./client/app/'));

    app.get('/', function(req, res) {
    	res.sendfile('./client/app/index.html');
	});

	app.listen(process.env.PORT || port, function(){
		console.log("server listening on port: "+port);
	});

	//here fetch news when the app first launch
	fetcher.fetchNews();
})()