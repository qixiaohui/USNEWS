'use strict';

/**
 * @ngdoc service
 * @name dingdangApp.service
 * @description
 * # service
 * Service in the dingdangApp.
 */
angular.module('dingdangApp')
  .service('service', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var topics = {sports: ['sports_nba'], politics: ['politics_us'], technology: ['technology_android']};
    this.readNews = function(){
        
    };
  });
