'use strict';

/**
 * @ngdoc service
 * @name dingdangApp.service
 * @description
 * # service
 * Service in the dingdangApp.
 */
app.service('newsService', function ($http) {
    this.baseUrl = "http://polar-sands-49796.herokuapp.com";
    this.newsUrl = "/news/";
    this.contentUrl = "/content";
    this.content = "";
    
    this.readNews = function(resolve, reject, topic, pageIndex){
        $http({
            method: 'GET',
            url: this.baseUrl+this.newsUrl+topic,
            headers: {
                pagination: pageIndex*10+1,
                language: window.navigator.userLanguage || window.navigator.language
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
.factory('newsCategory', function($http){
    this.baseUrl = "http://polar-sands-49796.herokuapp.com";
    this.menu = "/menu/";
    var language = window.navigator.userLanguage || window.navigator.language;
    return $http.get(this.baseUrl+this.menu+language.substring(0, 2));
})
;
