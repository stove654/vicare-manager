'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('ReportAllCtrl', function ($scope, $http, config, $state, localStorageService) {

    $scope.data = {
      reports: [],
      selectFilter: '1'
    };

    $scope.goHistoryChat = function (id, item) {
      $state.go('reportDetail', {id: id});
      localStorageService.set('reportDetail', item)
    };

    $scope.selectDataFilter = function (filter) {
      $http.post(config.url + config.api.report + 'index-all', {
        filter: filter
      }).then(function (response) {
        $scope.data.reports = response.data;
      });
    };

    var _init = function () {

      $http.post(config.url + config.api.report + 'index-all/').then(function (response) {

        $scope.data.reports = response.data;
      });

    };



    _init();

  });
