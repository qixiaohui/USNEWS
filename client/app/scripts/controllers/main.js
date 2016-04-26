'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('MainCtrl', function ($scope, $location, dataStore, newsService) {
    
    $scope.viewContent = function(content){
        //set the content of the specific paragraph
        //so you can access the url, and content on the content page
        newsService.setContent(content);
        $location.path("/content");
    };
    
  });
