var express = require('express');
var props = require('../util/url.js');
var router = express.Router();
var cacheManager = require('cache-manager');
var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});
/***twitter stuff**/
var Twit = require('twit');


exports.getTwits = function(req, callback) {
    var T = new Twit({
      consumer_key:         props.URL.twitter.apiKey,
      consumer_secret:      props.URL.twitter.apiSecret,
      access_token:         props.URL.twitter.accessToken,
      access_token_secret:  props.URL.twitter.accessTokenSecret,
      timeout_ms:           60*1000, 
    });

    //make request to twitter for twits using oauth
    //oath tokens secrets are in ./util/properties
    var promise = new Promise(function(resolve, reject){
        T.get('search/tweets', { q: '%40'+req.headers.q, count: req.headers.count }, function(err, data, response) {
          if(err){
            reject([]);
            return;
          }

          resolve(data.statuses);
        });        
    });

    promise.then(function(data){
        callback(null, data);
    }).catch(function(data){
        callback(true, [])
    });
};
