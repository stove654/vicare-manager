'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('ModalTimeCtrl', function ($scope, item, $http, $uibModalInstance, config) {

    console.log(item)

    $scope.timeSelected = item;
    $scope.search = {
      user: $scope.timeSelected.professional || []
    };
    console.log($scope.search);

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    $scope.addPro = function (item) {
      var check;
      for (var i = 0; i < $scope.search.user.length; i++) {
        if (item.username == $scope.search.user[i].name) {
          check = true;
          break;
        }
      }
      if (!check) $scope.search.user.push(item);
      $scope.search.name = '';
      $scope.search.items = [];
    };

    $scope.removePro = function (index) {
      $scope.search.user.splice(index, 1);
    };

    $scope.added = function () {
      if ($scope.timeSelected.id) {
        $http.put(config.url + config.api.calendar + $scope.timeSelected.id, {
          professional: $scope.search.user
        }).then(function (response) {
          $uibModalInstance.close(response.data);
        });
      } else {
        if ($scope.timeSelected.date && $scope.timeSelected.time && $scope.search.user.length) {
          var nowDate = angular.copy($scope.timeSelected.date);
          var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
          var params = {
            date: date,
            time: $scope.timeSelected.time,
            professional: $scope.search.user
          };

          $http.post(config.url + config.api.calendar, params).then(function (response) {
            $uibModalInstance.close(response.data);
          });

        }

      }

    };

    // $scope.getUser = function () {
    //   console.log($scope.search.name)
    //   $scope.search.items = [{"username":"Hoanghoan","professional_name":"","assigned_to":"Hoanghoan","place_name":"","id":33,"customer_name":""},{"username":"hoangvanloi","professional_name":"","assigned_to":"hoangvanloi","place_name":"","id":162,"customer_name":"Hoàng Văn Lợi"}]
    //   if (!$scope.search.name) $scope.search.items = [];
    // };

    $scope.getUser = debounce(function () {
      console.log($scope.search.name)
      $http.get(config.vicare + config.api.professional, {
        params: {
          name: $scope.search.name
        }
      }).then(function (response) {
        console.log(response.data);
        $scope.search.items = response.data;
        if (!$scope.search.name) $scope.search.items = [];
      })

    }, 250);

  });
