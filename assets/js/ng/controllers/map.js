'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MapCtrl', [ "$scope","$filter", "$firebase", "$routeParams", function($scope, $filter, $firebase, $routeParams)  {
  	console.log("MapCtrl");

    $scope.route = { userName: $routeParams.userName, mapId: $routeParams.mapId };

  }]);
