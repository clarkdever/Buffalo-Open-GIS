'use strict';
console.log("url generator");
/**
 * @ngdoc function
 * @name bogisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller for URL Generation
 */
angular.module('bogisApp').
  controller('urlTest', ['$scope','urlGenerator', function ($scope, urlGenerator) {
    console.log("urlTest");

    console.log(urlGenerator.test());
  }])
  .service('urlGenerator', ['$window', '$scope', function(win, $scope) {
    console.log("url generator factory");

    var $scope.nouns = [];
    var $scope.adjectives = [];

    this.init = function(){

      $http.get(('assets/js/ng/factories/animals.txt').then(function (data) { $scope.nouns = data.split('\n'); });
      $http.get(('assets/js/ng/factories/adjectives.txt').then(function (data) { $scope.adjectives = data.split('\n'); });

    }

    this.init();

    this.test = function(){
      console.log('test1');
      console.log(nouns, adjectives);
    }

    this.getURL = function() {
      return "" + this.getRandomAdjective() + this.getRandomAdjective + this.getRandomNoun();
    };

    this.getRandomNoun = function(){
      var val = Math.floor(Math.random() * (nouns.length - 0)) + 0;
      return nouns(val);
    };

    this.getRandomAdjective = function(){
      var val = Math.floor(Math.random() * (nouns.length - 0)) + 0;
      return adjectives(val);
    };
  }]);
