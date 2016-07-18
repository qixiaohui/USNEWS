'use strict';

const xRay = require('x-ray');
const url = require('./url');

const xray = new xRay();

var scrapper = {
	showTimes: (zip, days, name, res) => {
		const baseUrl = url.URL.movieBaseUrl;
		const fullUrl = `${baseUrl}near=${zip}&q=${name}&date=${days}`;

		xray(fullUrl, {
				movies: xray('#movie_results .movie_results .movie',[{
					title: '.header .desc h2 a',
					theaters: xray('.showtimes .show_left .theater,.showtimes .show_right .theater',[{
						theater: '.name a',
						address: '.address',
						schedule: xray('.times span', [{
							time: 'a',
							url: 'a@href'
						}])
					}])
				}])
			}
		)( (err, data) => {
			if(err){
				res.status(400).send();
				return;
			}

			res.send(data);
	});
	}
};

module.exports = scrapper;

// movieName: ['#movie_results .movie .header .desc h2 a'],
// 				name: ['#movie_results .showtimes .show_left .theater .name a, #movie_results .showtimes .show_right .theater .name a'],
// 				address: ['#movie_results .showtimes .show_left .theater .address, #movie_results .showtimes .show_right .theater .address'],
// 				time: ['#movie_results .showtimes .show_left .theater .address, #movie_results .showtimes .show_right .times span']