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
    });
    
      $urlRouterProvider.otherwise(
        '/base'
      );

    $translateProvider.translations('en', {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      visitWebsite: 'Visit Website',
      appName: 'Dingdang news'
    });

    $translateProvider.translations('zh', {
      home: '主页',
      about: '关于',
      contact: '联系方式',
      visitWebsite: '原链接',
      appName: '叮噹新闻'
    });

    $translateProvider.useSanitizeValueStrategy(null);

  });
