'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('ProfileCtrl', [ "$scope","$filter", "$firebase", "fbutil", "$routeParams", function($scope, $filter, $firebase, fbutil, $routeParams)  {
  	console.log("ProfileCtrl");

    $scope.route = { userName: $routeParams.userName };

    $scope.viewUserProfile;   
    loadViewProfile($scope.route.userName);

    function loadViewProfile(userName) {
      if( $scope.viewUserProfile ) {
        $scope.viewUserProfile.$destroy();
      }
      fbutil.syncObject('users/'+userName).$bindTo($scope, 'viewUserProfile');
    }
  }]);
