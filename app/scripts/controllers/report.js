'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('ReportCtrl', function ($scope, $http, config, $state, localStorageService) {

    $scope.data = {
      reports: []
    };

    $scope.goHistoryChat = function (id, item) {
      $state.go('reportDetail', {id: id});
      localStorageService.set('reportDetail', item)
    };

    var _init = function () {

      $http.get(config.url + config.api.report).then(function (response) {
        angular.forEach(response.data, function (value) {
          value.fromProfile = JSON.parse(value.fromProfile);
          value.toProfile = JSON.parse(value.toProfile);
        })
        $scope.data.reports = response.data;
        console.log(response.data)
      });
    };

    _init();

  });
