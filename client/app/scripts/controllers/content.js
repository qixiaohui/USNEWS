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
    $scope.loadingControl.loading = true;
    $scope.paragraph.content = newsService.getContent();
    
    var promise = new Promise(function(resolve, reject){
        newsService.readContent(resolve, reject, newsService.getContent().unescapedUrl);
    });
    
    promise.then(function(data){
        console.log(data.data);
        if(data !== {}){
            $scope.paragraph.p = data.data;
            $scope.loadingControl.loading = false;
            $scope.$apply();
        }else{
            
        }
    }).catch(function(err){
        $scope.paragraph.p = "no content";
        $scope.loadingControl.loading = false;
        $scope.$apply();
    });
  });