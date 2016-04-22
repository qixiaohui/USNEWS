'use strict';

/**
 * @ngdoc service
 * @name dingdangApp.service
 * @description
 * # service
 * Service in the dingdangApp.
 */
angular.module('dingdangApp')
  .service('newsService', function ($http) {
    this.queryUrl = [
    "http://polar-sands-49796.herokuapp.com/news/technology_linux",
    "http://polar-sands-49796.herokuapp.com/news/technology_windows",
    "http://polar-sands-49796.herokuapp.com/news/technology_ios",
    "http://polar-sands-49796.herokuapp.com/news/technology_android",
    "http://polar-sands-49796.herokuapp.com/news/technology_cloud"
    ];
    this.contentUrl = "http://polar-sands-49796.herokuapp.com/content";
    this.content = "";
    
    this.readNews = function(resolve, reject, index, pageIndex){
        $http({
            method: 'GET',
            url: this.queryUrl[index]
        }).then(function(data){
            resolve(data.data);
        },function(err){
            reject(err);
        });
    };
    
    this.readContent = function(resolve, reject, link, id){
        $http({
          method: 'GET',
          url: this.contentUrl,
          headers: {
            'link': link,
            'id': id
          }
        }).then(function(data){
            debugger;
            resolve(data);
        },function(err){
            reject(err);
        });
    };
    
    this.setContent = function(content){
        this.content = content;
    }
    
    this.getContent = function(){
        return this.content;
    }
  })

// this will store the top stories for each category
 .service('dataStore', function(){
    this.category = 0;
    this.pageIndex = {0: 0,
                     1: 0,
                     2: 0,
                     3: 0,
                     4: 0,
                     5: 0};
    
    this.getCategory = function(){
        return this.category;
    };
    
    this.setCategory = function(category){
        this.category = category;
    };
    
    this.getPageIndex = function(index){
        return this.pageIndex[index];
    };
    
    this.setPageIndex = function(index, pageIndex){
        this.pageIndex[index] = pageIndex;
    };
})

// return news categpry
.factory('newsCategory', function(){
    return [
        "linux",
        "windows",
        "ios",
        "android",
        "cloud"
    ];
})
;
