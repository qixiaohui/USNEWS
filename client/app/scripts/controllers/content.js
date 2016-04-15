'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('ContentCtrl', function (newsService, $scope, $location) {
    $scope.content = {};
    $scope.paragraph = {};
    $scope.content.html = newsService.getContent().content;
    
    var promise = new Promise(function(resolve, reject){
        newsService.readContent(resolve, reject, newsService.getContent().link);
    });
    
    promise.then(function(data){
        $scope.paragraph.p = data.data;
        $scope.$digest();
    }).catch(function(err){
        $scope.paragraph.p = "no content";
        $scope.$digest();
    });
  });