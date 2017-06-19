'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('OrderCtrl', function ($scope, $http, config, $state) {

    $scope.data = {
      orders: []
    };

    $scope.goToOrder = function (id) {
      $state.go('orderDetail', {id: id});
    };

    var _init = function () {

      $http.get(config.url + config.api.order).then(function (response) {
        $scope.data.orders = response.data;
      });
    };

    _init();

  });
