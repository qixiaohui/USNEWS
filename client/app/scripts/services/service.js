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
    this.baseUrl = "http://localhost:2000";
    this.newsUrl = "/news/";
    this.contentUrl = "/content";
    this.content = "";
    
    this.readNews = function(resolve, reject, topic, pageIndex){
        $http({
            method: 'GET',
            url: this.baseUrl+this.newsUrl+topic,
            headers: {
                pagination: pageIndex*10+1
            }
        }).then(function(data){
            resolve(data.data);
        },function(err){
            reject(err);
        });
    };
    
    this.readContent = function(resolve, reject, link, id){
        $http({
          method: 'GET',
          url: this.baseUrl+this.contentUrl,
          headers: {
            'link': link,
            'id': id
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
    // ["which genre", "which category"]
    this.category = [0,0];
    
    this.getCategory = function(){
        return this.category;
    };
    
    this.setCategory = function(category){
        this.category = category;
    };
})

// return news categpry
.factory('newsCategory', function(){
    return [
        {
            id: "WORLD_NEWS",
            genre: "World news",
            category: [
            "trending",
            "election 2016",
            "world news",
            "asia",
            "europe",
            "north america",
            "south america",
            "africa"
            ]
        },
        {
            id: "BUSINESS",
            genre: "Business",
            category: [
            "accounting",
            "automotive",
            "ecommerce",
            "econmics",
            "investments",
            "jobs",
            "law",
            "taxes",
            "trade",
            "Transportation"
            ]
        },
        {
            id: "HEALTH",
            genre: "Health",
            category: [
            "addictions",
            "beauty",
            "dentistry",
            "diet",
            "fitness",
            "medicine",
            "vision care",
            "weight issues"
            ]
        }, 
        {
            id: "SPORTS",
            genre: "Sports",
            category: [
            "basketball",
            "boxing",
            "football",
            "golf",
            "soccer",
            "baseball",
            "hockey",
            "tennis",
            "UFC"
            ]
        },
        {
            id: "TECHNOLOGY",
            genre: "Technology",
            category: [
            "linux",
            "windows",
            "ios",
            "android",
            "programming",
            "fpga",
            "embeded system"
            ]
        }
    ];
})
;
