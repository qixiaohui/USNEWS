'use strict';

/**
 * @ngdoc function
 * @name dingdangApp.controller:categoryCtrl
 * @description
 * # MainCtrl
 * Controller of the dingdangApp
 */
app.controller('categoryCtrl', function (newsCategory, $scope, dataStore, newsService, $location, $translate) {
    $scope.loadingControl = {loading: true};
    newsCategory.success(function(response){
        $scope.newsCategories = response;
        $scope.selectedCategory.value = $scope.newsCategories[genre[0]].category[genre[1]];
            // in the beginning it's 0
        $scope.getDatastoreNews(0);
    }).error(function(){
        $scope.newsCategories = [];
    });
    //which category the page is on
    var genre = dataStore.getCategory();
    $scope.selectedCategory = {};
    $scope.invalidQueryError = false;
    $scope.loadingPagination = {maxIndex:0,pageIndex:1,show:true};  
    $scope.showSideBarButton = true;
    
    //this will get called either first time load page
    // or from the side bar buttons
    $scope.getDatastoreNews = function(pageIndex){
        if(genre === null){
            genre = dataStore.getCategory();
        }
        
        if(pageIndex === null){
            pageIndex = 0;
        }

        $scope.loadingControl.loading = true;
        var topicName = $scope.selectedCategory.value;
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject, topicName, pageIndex);
        });

        promise.then(function(data){
            $scope.loadingControl.loading = false;
            $scope.news = data.results;
            $scope.loadingPagination.pageIndex = pageIndex+1;
            $scope.pagination(data.count);
            $scope.$digest();
        }).catch(function(err){
            console.error(JSON.stringify(err));
            $scope.loadingControl.loading = false;
            $scope.$digest();
        });        
    };

    //when user choose different genre
    $scope.getGenre = function(genr, category){
        //genre: 1,2,3..
        dataStore.setCategory([genr, category]);
        genre = [genr, category];
        //value: windows, linux..
        $scope.selectedCategory.value = $scope.newsCategories[genr].category[category];
        //get news from first page
        $scope.getDatastoreNews(0);
        $scope.toggleMenu();
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

    $scope.searchTopic = function(topic){
        $scope.loadingControl.loading = true;
        //when input is empty
        if(topic === undefined){
            $scope.invalidQueryError = true;
            $scope.loadingControl.loading = false;
            return;
        }
        topic = topic.replace(/[\/=():;]/g, '');
        //when input contain only invalid characters
        if(topic === ''){
            $scope.invalidQueryError = true;
            $scope.loadingControl.loading = false;
            $scope.topic = '';
            return;
        }
        $scope.selectedCategory.value = topic;
        $scope.topic = "";
        var promise = new Promise(function(resolve, reject){
            newsService.readNews(resolve, reject, topic, 0);
        });

        promise.then(function(data){
            $scope.loadingControl.loading = false;
            $scope.news = data.results;
            $scope.loadingPagination.pageIndex = 1;
            $scope.pagination(data.count);
            $scope.$digest();
        }).catch(function(err){
            console.log(JSON.stringify(err));
            $scope.loadingControl.loading = false;
            $scope.$digest();
        });
    };

    $scope.toggleMenu = function(){
        $scope.showSideBarButton=!$scope.showSideBarButton;
        $scope.showSideBarButton?$scope.buttonStyle={width: "0px"}:$scope.buttonStyle={width: "250px"};
    };
    var language = window.navigator.userLanguage || window.navigator.language;
    $translate.use(language.substring(0, 2));

  });