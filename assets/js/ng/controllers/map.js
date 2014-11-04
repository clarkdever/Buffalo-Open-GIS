'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MapCtrl', [ "$scope","$filter", "$firebase", function($scope, $filter, $firebase)  {
  	console.log("MapCtrl");
    //Setup the token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZ2lhbmFkZGEiLCJhIjoiRzRHV05uTSJ9.7BDOS7nCZCVrXSfemvzaFQ';

    //Create the map
    var map = L.mapbox.map('map', 'gianadda.k2gfi54f').setView([0, 0], 1);
    var geocoder = L.mapbox.geocoder('mapbox.places-v1');

    //Add a layer that we will add our markers to later
    var dataLayer = L.mapbox.featureLayer().addTo(map);


      //Scope function to load data
      $scope.LoadData = function () {
        var ref = new Firebase("https://BabyGorilla.firebaseio.com/" + "BOGISMarkers");
        $scope.data =  $firebase(ref).$asArray();
        $scope.data.$loaded(function() {
          console.log('loaded', $scope.data);
          dataToMarkers();
        });
       };

      $scope.LoadData();

      $scope.saveTable = function () {
           angular.forEach($scope.data, function(dataElement) {
             if (typeof(dataElement.address) !== "undefined"){
              if (typeof(dataElement.lat) == "undefined" || typeof(dataElement.lng) == "undefined") {
                geocoder.query(dataElement.address, function (err, data) {
                      dataElement.lat = data.latlng[0];
                      dataElement.lng = data.latlng[1];
                      if (dataElement.$id == null) {
                        $scope.data.$add(dataElement);
                      } else {
                        $scope.data.$save(dataElement);
                      }
                  });
              } else {
                if (dataElement.$id == null) {
                  $scope.data.$add(dataElement);
                } else {
                  $scope.data.$save(dataElement);
                }

              }

            } else {
              if (dataElement.$id == null) {
                $scope.data.$add(dataElement);
              } else {
                $scope.data.$save(dataElement);
              }
            }

          });
          //setTimeout(500,$scope.LoadData());
       };



      function dataToMarkers() {

            $("#table").handsontable({
              data: $scope.data,
              startRows: 7,
              startCols: 4,
              colHeaders: ['Lon', 'Lat', 'Name', 'Comment', 'Address',  'Size', 'Color'],
              columnSorting: true,
              columns: [
                {
                  data: 'lng',
                  type: 'numeric',
                  format: '0.00000',
                },
                {
                  data: 'lat',
                  type: 'numeric',
                  format: '0.00000',
                },
                {
                  data: 'name'
                },
                {
                  data: 'message'
                },
                {
                  data: 'address'
                }
              ],
              minSpareRows: 1 //,
              // Everytime the table is changed, update the markers on the map.
              //afterChange: stuffChanges
            });

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
                  'marker-size': "small",
                  'marker-color': "#ff0000",
                  'title': $scope.data[i].name + '<br/>' + $scope.data[i].message
                }
              });
            }
          }
          dataLayer.setGeoJSON(geojson);
          map.fitBounds(dataLayer.getBounds());
      };


  }]);
