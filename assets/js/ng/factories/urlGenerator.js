'use strict';
console.log("Url Generator");
/**
 * @ngdoc function
 * @name bogisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller for URL Generation
 */
angular.module('bogisApp').controller('UrlGenerator', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

    $scope.nouns = [];
    $scope.adjectives = [];

    this.init = function(){

      $http.get('assets/js/ng/factories/Buffalo.txt').success(function (data) { $scope.nouns = data.split('\n')});
      $http.get('assets/js/ng/factories/adjectives.txt').success(function (data) { $scope.adjectives = data.split('\n')});

    }

    this.init();

    $scope.getURL = function() {

      var path = "edit/" + getRandomAdjective().trim() + getRandomAdjective().trim() + getRandomNoun().trim();
      console.log("path: ", path);
      $window.location.href( path );
    };

    var getRandomNoun = function(){
      var val = Math.floor(Math.random() * ($scope.nouns.length - 0)) + 0;
      return $scope.nouns[val];
    };

    var getRandomAdjective = function(){
      var val = Math.floor(Math.random() * ($scope.adjectives.length - 0)) + 0;
      return $scope.adjectives[val];
    };

  }]);
