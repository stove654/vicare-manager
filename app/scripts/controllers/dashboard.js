'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('DashboardCtrl', function ($scope, $http, config) {

    $scope.data = {};

    $scope.updateStatus = function (item) {
      $http.put(config.url + config.api.question + item._id, {
        active: item.active
      }).then(function (response) {
        console.log(response)
      });
    };

    var _init = function () {
      $http.get(config.url + config.api.question).then(function (response) {
        $scope.data.questions = response.data;
      });
    };

    _init();
  });
