'use strict';
console.log("Url Generator");
/**
 * @ngdoc function
 * @name bogisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller for URL Generation
 */
angular.module('bogisApp').controller('UrlGenerator', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.nouns = [];
    $scope.adjectives = [];

    this.init = function(){

      $http.get('assets/js/ng/factories/animals.txt').success(function (data) { $scope.nouns = data.split('\n')});
      $http.get('assets/js/ng/factories/adjectives.txt').success(function (data) { $scope.adjectives = data.split('\n')});

    }

    this.init();

    $scope.getURL = function() {

      var path = "edit/" + getRandomAdjective() + getRandomAdjective() + getRandomNoun();
      console.log("path: ", path);
      $location.path( path );
        //Nick
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
