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
	var cacheManager = require('cache-manager');
	var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});
	var port = 2000;
	var fetcher = require('./dao/news_fetcher');
	var reader = require('./dao/news_reader');
	var scraper = require('./dao/news_scraper');
	var mongoApi = require('./database/mongo_api');
	var zh = require('./model/zh');
	var en = require('./model/en');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(compress());
	app.use(cors());
	app.use(logger('dev'));
	app.enable('trust proxy');

	//var limitter = rateLimit({});
	var readNews = function(req, res){
		console.log(req.headers.pagination);
		console.log(req.headers.language+"read")
		var cacheKey = req.params.tablename+req.headers.pagination+req.headers.language;
		memCache.wrap(cacheKey, function(callback){
			reader.readNews(req.params.tablename, req.headers.pagination, req.headers.language, callback);
		},function(err, data){
			if(err){
				res.send({});
			}
			res.send(data);
		});
	};

	//return menu list based on language
	var returnMenu = function(req, res){
		var langage = req.params.language;
		console.log(req.params.langage+"menu");
		if(langage === 'zh'){
			res.send(zh.menu);
		}else{
			res.send(en.menu);
		}
	};

	var scraping = function(req, res){
		//get the link from header
		var link = req.headers.link;
		var id = req.headers.id;
		var promise = new Promise(function(resolve, reject){
			mongoApi.queryCollection(resolve, reject, id);
		});

		promise.then(function(){
			var promise1 = new Promise(function(resolve, reject){
				mongoApi.readNews(id, resolve, reject);
			});
			
			promise1.then(function(val){
				res.send(val);
			}).catch(function(){
				res.send({});
			});
		}).catch(function(){
			scraper.scrape(req, res, link, id);
		});

	};


	//app.use(limitter);

	app.use(cors());

	app.get('/news/:tablename', readNews);

	app.get('/menu/:language', returnMenu);

	app.get('/content', scraping);

	app.get('/downloadApk', function(req, res){
	  var file = 'files/dingdangnews.apk';
	  res.setHeader('Content-disposition', 'attachment; filename=dingdangnews.apk');
	  res.download(file); // Set disposition and send it.
	});

	app.use(express.static('./client/app/'));

    app.get('/', function(req, res) {
    	res.sendfile('./client/app/index.html');
	});

	app.listen(process.env.PORT || port, function(){
		console.log("server listening on port: "+port);
	});

	//here fetch news when the app first launch
	//fetcher.fetchNews();
})()