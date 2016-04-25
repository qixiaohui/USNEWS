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
    //which category the page is on
    var genre = dataStore.getCategory();
    $scope.selectedCategory = {};
    $scope.loadingPagination = {maxIndex:0,pageIndex:1,show:true};
    $scope.selectedCategory.value = $scope.newsCategories[genre];
    
    //this will get called either first time load page
    // or from the side bar buttons
    $scope.getDatastoreNews = function(pageIndex){
        if(genre === null){
            genre = dataStore.getCategory();
        }
        
        if(pageIndex === null){
            pageIndex = dataStore.getPageIndex(genre);
        }
        $scope.loadingControl.loading = true;
        dataStore.setPageIndex(genre, pageIndex);
        //queryurlIndex: 1,2,3...
        var queryUrlIndex = genre;
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject, queryUrlIndex, pageIndex);
        });

        promise.then(function(data){
            $scope.loadingControl.loading = false;
            $scope.news = data.results;
            $scope.loadingPagination.pageIndex = pageIndex+1;
            $scope.pagination(data.count);
            $scope.$digest();
        }).catch(function(err){
            console.error(JSON.stringify(err));
            $scope.$digest();
        });        
    };

    //when user choose different genre
    $scope.getGenre = function(genr){
        //genre: 1,2,3..
        dataStore.setCategory(genr);
        genre = genr;
        //value: windows, linux..
        $scope.selectedCategory.value = $scope.newsCategories[genr];
        //get news from first page
        $scope.getDatastoreNews(0);
    };
    
    $scope.pagination = function(maxCount){
        $scope.loadingPagination.show = true;
        $scope.loadingPagination.maxIndex = parseInt(maxCount/10);
    };
    
    $scope.loadPage = function(pageIndex){
        $scope.loadingControl.loading = true;
        $scope.getDatastoreNews(pageIndex-1);
        window.scrollTo(0, 0);
    };
    
    $scope.getDatastoreNews(dataStore.getPageIndex(genre));

  });