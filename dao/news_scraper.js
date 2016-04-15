'use strict'

var mongoApi = require('../database/mongo_api');
var exports = module.exports = {};
var Xray = require('x-ray');
var x = Xray();

exports.scrape = function(req, res, link){

	x(link, 'p', [{paragraph: ''}])(function(err, content) {
		console.log(content);
	  	res.send(content);
	});
};
