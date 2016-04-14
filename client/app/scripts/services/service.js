'use strict';

/**
 * @ngdoc service
 * @name dingdangApp.service
 * @description
 * # service
 * Service in the dingdangApp.
 */
angular.module('dingdangApp')
  .service('newsService', function ($http) {
    var queryUrl = "http://localhost:2000/news/";
    // AngularJS will instantiate a singleton by calling "new" on this function
    var topics = {sports: ['sports_nba'], politics: ['politics_us'], technology: ['technology_android']};
    this.readNews = function(resolve, reject){
        $http.get(queryUrl+topics.sports[0]).success(function(data){
            resolve(data);
        }).error(function(err){
            reject(err);
        });
    };
  });
