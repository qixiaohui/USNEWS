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
    "http://localhost:2000/news/technology_linux",
    "http://localhost:2000/news/technology_arm",
    "http://localhost:2000/news/technology_ios",
    "http://localhost:2000/news/technology_android",
    "http://localhost:2000/news/technology_x86",
    "http://localhost:2000/news/technology_cloud"
    ];
    this.contentUrl = "http://localhost:2000/content";
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
    
    this.readContent = function(resolve, reject, link){
        $http({
          method: 'GET',
          url: this.contentUrl,
          headers: {
            'link': link
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
        "arm",
        "ios",
        "android",
        "x86",
        "cloud"
    ];
})
;
