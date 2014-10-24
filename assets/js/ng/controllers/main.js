'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
