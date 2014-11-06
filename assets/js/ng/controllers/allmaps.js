'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:AllMapCtrl
 * @description
 * # AllMapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('AllMapCtrl',  [ '$scope','$filter', '$firebase', "fbutil", 'FBURL', 'MBAccessToken', function($scope, $filter, $firebase, fbutil, FBURL, MBAccessToken)  {
  	console.log("AllMapCtrl");

    loadMaps();

    function loadMaps() {
      //fbutil.syncArray('users').$bindTo($scope, 'myMaps');
      var ref = new Firebase(FBURL + "/users");
      $scope.myMaps =  $firebase(ref).$asObject();

    }
  
         
      
  }]);
