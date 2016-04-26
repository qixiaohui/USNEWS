'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('ContentCtrl', function (newsService, $scope, $location, $window) {
    $scope.content = {};
    $scope.paragraph = {};
    $scope.loadingControl.loading = true;
    $scope.paragraph.content = newsService.getContent();
    var promise = new Promise(function(resolve, reject){
        var id = newsService.getContent().title.replace(/\W/g,'');
        newsService.readContent(resolve, reject, newsService.getContent().url, id);
    });
    
    promise.then(function(data){
        console.log(data.data);
        if(data !== {}){
            $scope.paragraph.p = data.data[0].content;
            $scope.loadingControl.loading = false;
            $scope.$apply();
        }else{
            
        }
    }).catch(function(err){
        $scope.paragraph.p = "no content";
        $scope.loadingControl.loading = false;
        $scope.$apply();
    });
    
    $scope.goTo = function(link){
        $window.open(link, '_blank');
    };
  });