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

    var d = new Date();
    d.setDate(d.getDate() - 7);
    console.log(d.toString());

    $scope.data = {
      reports: [],
      selectFilter: '1',
      from: d,
      to: new Date()
    };

    console.log($scope.data.from);

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.dateOptions1 = {
      formatYear: 'yy',
      maxDate: new Date()
    };

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.dateOptions2 = {
      formatYear: 'yy',
      maxDate: new Date()
    };

    $scope.goHistoryChat = function (id, item) {
      $state.go('reportDetail', {id: id});
      localStorageService.set('reportDetail', item)
    };

    $scope.selectDataFilter = function (filter) {
      var query = {
        filter: filter,
        from: $scope.data.from,
        to: $scope.data.to
      };

      console.log(query)
      $http.get(config.url + config.api.report, {
        params: query
      }).then(function (response) {
        $scope.data.reports = response.data;
      });
    };

    $scope.$watch('data.from', function () {
      $scope.selectDataFilter($scope.data.selectFilter);
    });

    $scope.$watch('data.to', function () {
      $scope.selectDataFilter($scope.data.selectFilter);
    });

    var _init = function () {

      $scope.selectDataFilter($scope.data.selectFilter);
    };

    _init();

  });
