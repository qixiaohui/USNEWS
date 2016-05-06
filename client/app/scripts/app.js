'use strict';

/**
 * @ngdoc overview
 * @name dingdangApp
 * @description
 * # dingdangApp
 *
 * Main module of the application.
 */
var app = angular
  .module('dingdangApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'pascalprecht.translate'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
      .state('base', {
        url: '/base',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('content', {
        url: '/content',
        templateUrl: 'views/content.html',
        controller: 'ContentCtrl'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    });
    
      $urlRouterProvider.otherwise(
        '/base'
      );

    $translateProvider.translations('en', {
      home: 'Home',
      about: 'Mobile App',
      contact: 'Contact',
      visitWebsite: 'Visit Website',
      appName: 'Dingdang news',
      searchTopic: 'Search topic',
      googlePlayDescription: 'Visit the Dingdang news android app on google play:',
      troubleOpenWebsite: 'If you have trouble open google play page, please download the apk file from here:'
    });

    $translateProvider.translations('zh', {
      home: '主页',
      about: '手机客户端',
      contact: '联系方式',
      visitWebsite: '原链接',
      appName: '叮噹新闻',
      searchTopic: '搜索新闻',
      googlePlayDescription: '在安卓市场下载叮噹新闻安卓客户端：',
      troubleOpenWebsite: '如果不能打开谷歌市场请点击这里下载安装包'
    });

    $translateProvider.useSanitizeValueStrategy(null);

  });
