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
.factory('newsCategory', function(){
    var language = window.navigator.userLanguage || window.navigator.language;
    if(language === 'zh-CN' || language === 'zh-TW'){
        return[
            {
                id: "WORLD_NEWS",
                genre: "世界新闻",
                category: [
                "热门新闻",
                "环球新闻",
                "亚洲",
                "欧洲",
                "北美",
                "南美",
                "非洲"
                ]
            },
            {
                id: "BUSINESS",
                genre: "财经新闻",
                category: [
                "会计",
                "汽车",
                "工商",
                "经济",
                "投资",
                "工作",
                "法律",
                "交通"
                ]
            },
            {
                id: "HEALTH",
                genre: "健康",
                category: [
                "美容",
                "牙科",
                "节食",
                "健身",
                "医药"
                ]
            }, 
            {
                id: "SPORTS",
                genre: "体育新闻",
                category: [
                "篮球",
                "拳击",
                "美式橄榄球",
                "高尔夫",
                "足球",
                "棒球",
                "冰球",
                "网球",
                "UFC"
                ]
            },
            {
                id: "TECHNOLOGY",
                genre: "科技新闻",
                category: [
                "linux",
                "windows",
                "苹果",
                "安卓",
                "编程",
                "fpga",
                "嵌入式系统"
                ]
            }
        ];
    }else{
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
    }
})
;
