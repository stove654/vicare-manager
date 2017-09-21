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
    'ui.bootstrap',
    'btford.socket-io',
    'ui.select',
    'ui.bootstrap.datetimepicker',
    'LocalStorageModule'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {

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
      })
      .state('order', {
        url: '/order',
        templateUrl: 'views/states/order.html',
        controller: 'OrderCtrl'
      })
      .state('orderDetail', {
        url: '/order/:id',
        templateUrl: 'views/states/order-detail.html',
        controller: 'OrderDetailCtrl'
      })
      .state('report', {
        url: '/report',
        templateUrl: 'views/states/report.html',
        controller: 'ReportCtrl'
      })

      .state('reportAll', {
        url: '/reportAll',
        templateUrl: 'views/states/report-all.html',
        controller: 'ReportAllCtrl'
      })
      .state('reportDetail', {
        url: '/report/:id',
        templateUrl: 'views/states/report-detail.html',
        controller: 'ReportDetailCtrl'
      })
      .state('setting', {
        url: '/setting',
        templateUrl: 'views/states/setting.html',
        controller: 'SettingCtrl'
      })


    $urlRouterProvider.otherwise('/dashboard');
  });
