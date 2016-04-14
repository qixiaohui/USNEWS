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
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
    
      $urlRouterProvider.otherwise(
        '/'
      );
  });
