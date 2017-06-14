'use strict';

/**
 * @ngdoc overview
 * @name appManager
 * @description
 * # appManager
 *
 * Main module of the application.
 */
angular
  .module('appManager', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/states/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'views/states/chat.html',
        controller: 'ChatCtrl'
      });
      
    $urlRouterProvider.otherwise('/dashboard');
  });
