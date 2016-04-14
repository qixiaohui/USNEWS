'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('MainCtrl', function (newsService, $scope) {
    $scope.news = [];
    
    var promise = new Promise(function(resolve, reject){
        newsService.readNews(resolve, reject);
    });
    
    promise.then(function(data){
        $scope.news = data[0].items;
        $scope.$digest();
    }).catch(function(err){
        console.error(JSON.stringify(err));
    });
  });
