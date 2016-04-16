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
    this.topics = {google: ['google_topheadlines', 
                            'google_worldNews', 
                            'google_businessNews', 
                            'google_nationNews', 
                            'google_technology', 
                            'google_election', 
                            'google_politicsNews', 
                            'google_entertainmentNews',
                            'google_sportNews',
                            'google_healthNews']};
    this.readNews = function(resolve, reject, index){
        $http.get(this.queryUrl+this.topics.google[index]).success(function(data){
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

// this will store the top stories for each category
 .service('dataStore', function(){
    this.categpry = 0;
    this.topStory = {};
    
    this.getCategory = function(){
        return this.categpry;
    };
    
    this.setCategory = function(category){
        this.category = category;
    };
    
    this.getTopStory = function(key){
        debugger;
        if(this.topStory[key] !== undefined){
            return this.topStory[key];
        }else{
            return null;
        }
    };
    
    this.setTopStory = function(key, value){
        debugger;
        if(this.topStory[key] === undefined){
            this.topStory[key] = {value: value};
        }
    };
})

// return news categpry
.factory('newsCategory', function(){
    return [
        "Top headline",
        "World news",
        "Business news",
        "Nation news",
        "Technology news",
        "Election",
        "Politics news",
        "Entertainment news",
        "Sport news",
        "Health news"
    ];
})
;
