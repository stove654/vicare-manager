'use strict';

/**
 * @ngdoc function
 * @name appManager.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appManager
 */
angular.module('appManager')
  .controller('ChatCtrl', function ($scope, $http, config, $uibModal) {

    $scope.data = {};
    $scope.data.times = [
      {
        time: '00:00'
      },
      {
        time: '00:30'
      },
      {
        time: '01:00'
      },
      {
        time: '01:30'
      },
      {
        time: '02:00'
      },
      {
        time: '02:30'
      },
      {
        time: '03:00'
      },
      {
        time: '03:30'
      },
      {
        time: '04:00'
      },
      {
        time: '04:30'
      },
      {
        time: '05:00'
      },
      {
        time: '05:30'
      },
      {
        time: '06:00'
      },
      {
        time: '06:30'
      },
      {
        time: '07:00'
      },
      {
        time: '07:30'
      },
      {
        time: '08:00'
      },
      {
        time: '08:30'
      },
      {
        time: '09:00'
      },
      {
        time: '09:30'
      },
      {
        time: '10:00'
      },
      {
        time: '10:30'
      },
      {
        time: '11:00'
      },
      {
        time: '11:30'
      },
      {
        time: '12:00'
      },
      {
        time: '12:30'
      },
      {
        time: '13:00'
      },
      {
        time: '13:30'
      },
      {
        time: '14:00'
      },
      {
        time: '14:30'
      },
      {
        time: '15:00'
      },
      {
        time: '15:30'
      },
      {
        time: '16:00'
      },
      {
        time: '16:30'
      },
      {
        time: '17:00'
      },
      {
        time: '17:30'
      },
      {
        time: '18:00'
      },
      {
        time: '18:30'
      },
      {
        time: '19:00'
      },
      {
        time: '19:30'
      },
      {
        time: '20:00'
      },
      {
        time: '20:30'
      },
      {
        time: '21:00'
      },
      {
        time: '21:30'
      },
      {
        time: '22:00'
      },
      {
        time: '22:30'
      },
      {
        time: '23:00'
      },
      {
        time: '23:30'
      }
    ];
    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.today();
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      maxDate: new Date(2020, 5, 22),
      startingDay: 1
    };

    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
    $scope.altInputFormats = $scope.formats[1]

    $scope.popup1 = {
      opened: false
    };

    $scope.addCalendar = function (item) {
      console.log(item);
      item.date = $scope.dt;

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: './views/modals/time.html',
        controller: 'ModalTimeCtrl',
        size: 'md',
        resolve: {
          item: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (response) {
        item.professional = response.professional;
      }, function () {

      });

    };
    $scope.$watch('dt', function (value) {
      console.log(value);
      _init();
    });

    var _init = function () {
      var nowDate = angular.copy($scope.dt);
      var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
      $http.get(config.url + config.api.calendar, {
        params: {
          date: date
        }
      }).then(function (response) {
        console.log(response.data);
        angular.forEach($scope.data.times, function (value) {
          value.professional = null;
          value.id = null;
          for (var i = 0; i < response.data.length; i++) {
            if (value.time == response.data[i].time) {
              value.professional = response.data[i].professional;
              value.id = response.data[i]._id;
              console.log(value);
            }
          }
        });
        console.log($scope.data.times);
      });
    };

    _init();

  });
