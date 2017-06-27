'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('SettingCtrl', function ($scope, $http, config, $state) {

    $scope.data = {
      setting: {}
    };

    $scope.changeOpenChat = function () {
      console.log($scope.data.setting.openChat);
      $http.put(config.url + config.api.setting, $scope.data.setting).then(function (response) {
        console.log(response)
      })
    }

    var _init = function () {

      $http.get(config.url + config.api.setting).then(function (response) {
        $scope.data.setting = response.data;
        console.log(response.data);
      });
    };

    _init();

  });
