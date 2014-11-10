'use strict';

/**
 * @ngdoc function
 * @name bogisApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bogisApp
 */
angular.module('bogisApp')
  .controller('EditCtrl', [ '$scope','$filter', '$firebase', 'user', 'FBURL', 'fbutil', 'MBAccessToken', '$routeParams', function($scope, $filter, $firebase, user, FBURL, fbutil, MBAccessToken, $routeParams)  {
  	console.log("EditCtrl");

    $scope.route = { mapId: $routeParams.mapId };



    //Setup the token
    L.mapbox.accessToken = MBAccessToken;

    var geocoder = L.mapbox.geocoder('mapbox.places-v1');

    var maxed = false
      , resizeTimeout
      , availableWidth
      , availableHeight
      , $window = $(window)
      , $table = $('#table');

    var calculateSize = function () {
      if(maxed) {
        var offset = $example1.offset();
        availableWidth = $window.width() - offset.left + $window.scrollLeft();
        availableHeight = $window.height() - offset.top + $window.scrollTop();
        $table.width(availableWidth).height(availableHeight);
      }
      $table.handsontable('render');
    };
    $window.on('resize', calculateSize);
    calculateSize();

      //Scope function to load data
      $scope.LoadData = function () {
        var ref = new Firebase(FBURL + "/users/" + user.uid + "/maps/" + $scope.route.mapId);
        $scope.data =  $firebase(ref).$asArray();
        $scope.data.$loaded(function() {
          console.log('loaded', $scope.data);
          dataToMarkers();
        });

       };

        $scope.thisMap;
        loadThisMap();

        function loadThisMap() {
          if( $scope.thisMap ) {
            $scope.thisMap.$destroy();
          }
          fbutil.syncObject( "users/" + user.uid + "/maps/" + $scope.route.mapId).$bindTo($scope, 'thisMap').then(function() {
              var nick = nick;

          })
        }


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

      var checkboxRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        var $td = $(td);
       // if (value !== true && value !== false)
        value = true;

        // Center the checkbox within the cell
        $td.addClass('center');

        Handsontable.CheckboxCell.renderer.apply(this, arguments);
    }

      function dataToMarkers() {

            $table.handsontable({
              data: $scope.data,
              startRows: 7,
              startCols: 4,
              fixedColumnsLeft: 2,
              colHeaders: ['Latitude', 'Longitude', 'Name', 'Comment', 'Address',  'Size', 'Color', 'URL', 'Filter 1', 'Filter 2', 'Filter 3'],
              columnSorting: true,
              columns: [
                {
                  data: 'lat',
                  type: 'numeric',
                  format: '0.00000',
                },
                {
                  data: 'lng',
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
                },
                {
                  type: 'dropdown',
                  data: 'size',
                  source: ["Small", "Medium", "Large"]
                },
                {
                  type: 'dropdown',
                  data: 'color',
                  source: ["yellow", "red", "orange", "green", "blue", "gray", "black", "white"]
                },
                {
                  data: 'URL'
                },
                {
                  data: 'Filter1'
                },
                {
                  data: 'Filter2'
                },
                {
                  data: 'Filter3'
                }
              ],
              minSpareRows: 1
            });

      };

  }]);
