'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MapCtrl',  [ '$scope','$filter', '$firebase',  'FBURL', 'MBAccessToken', '$routeParams', function($scope, $filter, $firebase,  FBURL, MBAccessToken, $routeParams)  {
  	console.log("MapCtrl");

    $scope.route = { mapId: $routeParams.mapId, userId: $routeParams.userName };


    //Setup the token
    L.mapbox.accessToken = MBAccessToken;

    //Create the map
    var map = L.mapbox.map('map', 'gianadda.k2gfi54f').setView([0, 0], 1);
    var geocoder = L.mapbox.geocoder('mapbox.places-v1');

    //Add a layer that we will add our markers to later
    var dataLayer = L.mapbox.featureLayer().addTo(map);


      //Scope function to load data
      $scope.LoadData = function () {
        var ref = new Firebase(FBURL + "/users/" + $routeParams.userName + "/maps/" + $routeParams.mapId);
        $scope.data =  $firebase(ref).$asArray();
        $scope.data.$loaded(function() {
          console.log('loaded', $scope.data);
          dataToMarkers();
        });
       };

      $scope.LoadData();

    
      function dataToMarkers() {

           // Create a new geojson object that'll represent the table values.
          var geojson = { type: 'FeatureCollection', features: [] };
          // For each table row, create a marker.
          for (var i = 0; i < $scope.data.length; i++) {
            // Blank rows shouldn't be included - they're easy to detect and skip.
            if ($scope.data[i].lon !== null && $scope.data[i].lat !== null) {
              geojson.features.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [ $scope.data[i].lng, $scope.data[i].lat]
                },
                properties: {
                  'marker-size': $scope.data[i].size.toLowerCase(),
                  'marker-color': ConvertColorNameToHex($scope.data[i].color),
                  'title': CreateToolTipPopup($scope.data[i])
                }
              });
            }
          }
          dataLayer.setGeoJSON(geojson);
          map.fitBounds(dataLayer.getBounds());
      };

    function CreateToolTipPopup(data) {
        
        var htmlString = '';
        //Title
        //Desc
        htmlString = htmlString + '<h2>' + data.name + '</h2>'
        
        if (data.URL != '') {
            htmlString = htmlString + '<a href="' + data.URL + '" target="_blank" title="' + data.name + '">' + data.URL  +'</a>'
        }
        
        htmlString = htmlString + '<p>' + data.message + '</p>'
                          
        return htmlString;
    }
         

     function ConvertColorNameToHex(color) {
     
         var colors = {
             "yellow":"#ffff00",
             "red":"#ff0000",
             "orange":"#ffa500",
             "green":"#008000",
             "blue":"#0000ff",
             "gray":"#808080",
             "black":"#000000",
             "white":"#ffffff"};

        if (typeof colors[color.toLowerCase()] != 'undefined')
            return colors[color.toLowerCase()];

        return false;
     }
         
      
  }]);
