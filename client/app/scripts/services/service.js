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
    this.queryUrl = "http://localhost:2000/news/";
    this.contentUrl = "http://localhost:2000/content";
    this.content = "";
    
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.topics = {top: ['top_story'], politics: ['politics_us'], technology: ['politics_us']};
    this.readNews = function(resolve, reject){
        $http.get(this.queryUrl+this.topics.top[0]).success(function(data){
            resolve(data);
        }).error(function(err){
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
 .service('dataStore', function(){
    this.topStory = [];
    
    this.getTopStory = function(){
        return this.topStory;
    };
    
    this.setTopStory = function(topStory){
        this.topStory = topStory;  
    };
});
