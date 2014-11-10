'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('MapCtrl',  [ '$scope','$filter', '$firebase',  'FBURL', 'fbutil', 'MBAccessToken', '$routeParams', function($scope, $filter, $firebase,  FBURL, fbutil,  MBAccessToken, $routeParams)  {
  	console.log("MapCtrl");

    $scope.route = { mapId: $routeParams.mapId, userId: $routeParams.userName };


    //Setup the token
    L.mapbox.accessToken = MBAccessToken;

    //Create the map
    var map = L.mapbox.map('map', 'gianadda.k2gfi54f', {zoomControl: true}).setView([0, 0], 1);
    // Disable drag and zoom handlers.
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

      
      
    var geocoder = L.mapbox.geocoder('mapbox.places-v1');
    $scope.AllowAnonAdd = false;
     
    //Add a layer that we will add our markers to later
    var dataLayer = L.mapbox.featureLayer().addTo(map);

        $scope.thisMap;   
        loadThisMap();

        function loadThisMap() {
          if( $scope.thisMap ) {
            $scope.thisMap.$destroy();
          }
          fbutil.syncObject("/users/" + $routeParams.userName + "/maps/" + $routeParams.mapId).$bindTo($scope, 'thisMap').then(function() {
               if (typeof($scope.thisMap.AllowAnonAdd) !== 'undefined') {
                  //If navigator is there, show the Add location button
                  if (navigator.geolocation) {
                      $scope.AllowAnonAdd = $scope.thisMap.AllowAnonAdd
                      //
                      // HACK ALERT!!! Can't get Angular to do what I want...
                      //
                      if ($scope.AllowAnonAdd) {
                          $("#addLocation").removeClass('ng-hide');
                      }
                  }
               }

          })
        }
      
//      
       //Scope function to load data
      $scope.AllowAnon = function ()  {
          
         return $scope.AllowAnonAdd;
         
       };
      
      
      
      //Scope function to load data
      $scope.AddMyPoint = function ()  {
          
          if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(saveMyLocationData);
            } else {
                console.log('Cannot determine geolocation','Cannot determine geolocation');
            }
         
       };
      
      $scope.showMyLocationModal = function ()  {
          
          $('#addLocationModal').modal('show');
         
       };
      
      //Scope function to load data
      $scope.LoadData = function ()  {
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
            if (typeof($scope.data[i].lat) !== 'undefined' &&
                    typeof($scope.data[i].lng) !== 'undefined' &&
                    $scope.data[i].lng !== null && 
                    $scope.data[i].lat !== null && 
                    $scope.data[i].lat !== "" && 
                    $scope.data[i].lng !== "" ) {
              geojson.features.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [ $scope.data[i].lng, $scope.data[i].lat]
                },
                properties: {
                  'marker-size': ValidateSize($scope.data[i].size).toLowerCase(),
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
        
        if (typeof(data.URL) !== "undefined") {
            htmlString = htmlString + '<a href="' + data.URL + '" target="_blank" title="' + data.name + '">' + data.URL  +'</a>'
        }
        
        htmlString = htmlString + '<p>' + data.message + '</p>'
                          
        return htmlString;
    }
         

     function ConvertColorNameToHex(color) {
     
         if (typeof(color) != 'undefined') {
             
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
         }
         
        //If you don't find it, return blue
        return "#0000ff";
     }
      
 
     function ValidateSize(size) {
     
        if (size == 'Small' || size == 'Medium' || size == 'Large')
            return size;

        return 'Small' ;
     }
           
      
      function saveMyLocationData(position){
            console.log('geoLocation', 'Lat: ' + position.coords.latitude + ', Long: ' + position.coords.longitude);
            var dataElement = {};
            dataElement.name = $scope.myLocation.name;
            dataElement.message = $scope.myLocation.comment;
            dataElement.lat = position.coords.latitude;
            dataElement.lng = position.coords.longitude;
            dataElement.color = $scope.myLocation.color;
            dataElement.size = $scope.myLocation.size;
            $scope.data.$add(dataElement);
            $scope.LoadData();
            $('#addLocationModal').modal('hide');
        }
      
  }]);
