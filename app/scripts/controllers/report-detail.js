'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('ReportDetailCtrl', function ($scope, $http, config, $stateParams, localStorageService) {

    $scope.data = {};

    var _init = function () {

      $scope.data.chanel = localStorageService.get('reportDetail');

      $http.get(config.url + config.api.report + $stateParams.id).then(function (response) {
        // angular.forEach(response.data, function (value) {
        //   if (value.from == $scope.data.chanel.from) {
        //     value.user = {
        //       name: $scope.data.chanel.fromProfile.name,
        //       avatar: $scope.data.chanel.fromProfile.small_avatar
        //     }
        //
        //   } else {
        //     value.user = {
        //       name: $scope.data.chanel.toProfile.name,
        //       avatar: $scope.data.chanel.toProfile.main_thumbnail_image
        //     }
        //     value.active = true;
        //   }
        // })
        $scope.data.messages = response.data;

        console.log($scope.data.messages, $scope.data.chanel);
      });
    };

    _init();

  });
