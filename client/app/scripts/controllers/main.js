'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('MainCtrl', function (newsService, $scope, $location, dataStore) {
    $scope.news = dataStore.getTopStory();
    
    if($scope.news.length === 0){
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject);
        });

        promise.then(function(data){
            $scope.news = data[0].responseData.feed.entries;
            dataStore.setTopStory($scope.news);
            $scope.$digest();
        }).catch(function(err){
            console.error(JSON.stringify(err));
        });
    }
    
    $scope.viewContent = function(content){
        newsService.setContent(content);
        $location.path("/content");
    };
  });
