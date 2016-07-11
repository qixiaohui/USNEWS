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
	var fs = require('fs');
	var cacheManager = require('cache-manager');
	var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});
	var port = 2000;
	var fetcher = require('./dao/news_fetcher');
	var reader = require('./dao/news_reader');
	var scraper = require('./dao/news_scraper');
	var mongoApi = require('./database/mongo_api');
	var zh = require('./model/zh');
	var en = require('./model/en');
	var twitter = require('./dao/twit');
	var apicache = require('apicache').options({debug: true}).middleware;
	var showtimes = require('showtimes');

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

	var getHeros = function(req, res){
		res.header('Content-type', 'application/json');
		res.header('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Charset', 'utf8');

        fs.readFile('./json/heros.json', 'utf8', function (err, data) {
	        if (err) {
        		res.send([]);
	            return;
	        }

	        res.send(data);
		});
	};

	var twit = function(req, res) {
		res.header('Content-type', 'application/json');
		res.header('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Charset', 'utf8');

		var cacheKey = req.headers.q + req.headers.count;

	  //use memory cache to cache call
	  //headers {q:,count:}
		memCache.wrap(cacheKey, function(callback){
			twitter.getTwits(req, callback);
		},function(err, data){
			res.send(data);
		});
	};

	var mockNews = function(req, res){
        fs.readFile('./json/news.json', 'utf8', function (err, data) {
	        if (err) {
        		res.send([]);
	            return;
	        }

	        res.send(data);
		});		
	};

	app.get('/schedule/theaters/:name/:zip/:day', apicache('1 day'), function(req, res){
	    req.apicacheGroup = req.params.name+req.params.zip+req.params.day;
	    let name = req.params.name;
	    let zip = req.params.zip;
	    let day = req.params.day;

	    var api = new showtimes(zip, {date: day});
	    console.log();

	    api.getTheaters((err, theaters) => {
	        if(err){
	            res.status(400).send('Ooops something went wrong');
	            return;
	        }

	        res.send(theaters);
	    });
	});


	//app.use(limitter);

	app.use(cors());

	app.get('/news/:tablename', readNews);

	app.get('/menu/:language', returnMenu);

	app.get('/heros/allheros', getHeros)

	app.get('/content', scraping);

	//mock data for news
	app.get('/news', mockNews);

		//Router to get twits
	app.get('/allTwits', twit);

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