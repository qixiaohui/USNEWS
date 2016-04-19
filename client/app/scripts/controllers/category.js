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
    $scope.loadingPagination = {maxIndex:0,pageIndex:1,show:true};
    $scope.selectedCategory.value = $scope.newsCategories[index];
    
    //this will get called either first time load page
    // or from the side bar buttons
    $scope.getDatastoreNews = function(index, pageIndex){
        if(index === null){
            index = dataStore.getCategory();
        }
        
        if(pageIndex === null){
            pageIndex = dataStore.getPageIndex(index);
        }
        $scope.loadingControl.loading = true;
        $scope.selectedCategory.value = $scope.newsCategories[index];
        dataStore.setCategory(index);
        dataStore.setPageIndex(index, pageIndex);
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject, index, pageIndex);
        });

        promise.then(function(data){
            $scope.loadingControl.loading = false;
            $scope.news = data[0].result.docs;
            $scope.loadingPagination.pageIndex = data.responseData.cursor.currentPageIndex+1;
            $scope.pagination(data.responseData.cursor.estimatedResultCount);
            $scope.$digest();
        }).catch(function(err){
            console.error(JSON.stringify(err));
        });        
    };
    
    $scope.pagination = function(maxCount){
        $scope.loadingPagination.show = true;
        $scope.loadingPagination.maxIndex = parseInt(maxCount/8);
    };
    
    $scope.getDatastoreNews(index, dataStore.getPageIndex(index));

  });