'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MainCtrl', function ($scope, simpleLogin) {
  	console.log("MainCtrl");
    $scope.logout = simpleLogin.logout;
  });
