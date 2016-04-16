'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:categoryCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
angular.module('dingdangApp')
  .controller('categoryCtrl', function (newsCategory, $scope, dataStore, newsService, $location) {
    $scope.loadingControl = {loading: true};
    $scope.newsCategories = newsCategory;
    var index = dataStore.getCategory();
    $scope.selectedCategory = {};
    $scope.selectedCategory.value = $scope.newsCategories[index];
    $scope.news = dataStore.getTopStory($scope.selectedCategory);
    
    //this will get called either first time load page
    // or from the side bar buttons
    $scope.getDatastoreNews = function(index){
        dataStore.setCategory(index);
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject, index);
        });

        promise.then(function(data){
            $scope.loadingControl.loading = false;
            $scope.news = data[0].responseData.results;
            // cache all the category stories in datasore
            // param: key, value 
            dataStore.setTopStory($scope.newsCategories[index], $scope.news);
            $scope.$digest();
        }).catch(function(err){
            console.error(JSON.stringify(err));
        });        
    };
    
    // check if the specific category exists
    $scope.checkCache = function(index){
        $location.path("/base");
        $scope.loadingControl.loading = true;
        $scope.selectedCategory.value = $scope.newsCategories[index];
        var cacheResult = dataStore.getTopStory($scope.selectedCategory.value);
        if( cacheResult !== null){
            $scope.loadingControl.loading = false;
            $scope.news = cacheResult.value;
        }else{
            $scope.getDatastoreNews(index);
        }
    };
    
    if($scope.news === null){
        $scope.getDatastoreNews(index);
    }

  });