'use strict';

/**
 * @ngdoc overview
 * @name dingdangApp
 * @description
 * # dingdangApp
 *
 * Main module of the application.
 */
angular
  .module('dingdangApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
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
  });
