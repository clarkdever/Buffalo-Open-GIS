'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('ProfileCtrl', [ "$scope","$filter", "$firebase", "$routeParams", function($scope, $filter, $firebase, $routeParams)  {
  	console.log("ProfileCtrl");

    $scope.route = { userName: $routeParams.userName };


  }]);
