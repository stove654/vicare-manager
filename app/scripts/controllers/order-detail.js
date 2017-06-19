'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('OrderDetailCtrl', function ($scope, $http, config, $stateParams) {

    $scope.data = {};

    $scope.refreshProfessional = function (name) {
      $http.get(config.vicare + config.api.professional, {
        params: {
          name: name
        }
      }).then(function (response) {
        $scope.data.professionals = response.data;
        console.log(response.data);
      })

    };

    $scope.saveOrder = function () {
      var params = {
        open: $scope.data.order.open,
        end: $scope.data.order.end,
        professional: $scope.data.order.professional,
        status: 2
      };

      $http.put(config.url + config.api.order + $stateParams.id, params).then(function (response) {

      });
      console.log(params);
    };

    var _init = function () {

      $http.get(config.url + config.api.order + $stateParams.id).then(function (response) {
        $scope.data.order = response.data;
        console.log($scope.data.order);
      });
    };

    _init();

  });
