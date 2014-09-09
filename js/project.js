
var dataGovINApp = angular.module('dataGovINApp', ['ngRoute','google-maps']);

// configure our routes
dataGovINApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html'
		})
		// TN urban population
		.when('/tn_ulb_pop', {
			templateUrl : 'pages/tn_ulb_pop.html',
			controller  : 'tnULBPopController'
		});
	});

// define controllers for each page
dataGovINApp.controller('tnULBPopController', ['$scope','$http', function ($scope,$http) {
  
  // Enable the new Google Maps visuals until it gets enabled by default.
  // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
  google.maps.visualRefresh = true;
  

  // default latitude and longitude values. set to Salem which is kinda at the center of Tamil Nadu
  $scope.lat = 10.9580; 
  $scope.lon = 78.0800;
  $scope.errorMessage = '';
  
  $scope.map = {
    center: {        
        latitude: $scope.lat,
        longitude: $scope.lon
    },
    options: { draggable: true },
    zoom: 8,
    events : {}
 };


 $scope.markerModels = [];
 $scope.options = {scrollwheel: false};
 $scope.markersEvents = {
 	click: function (gMarker, eventName, model) {
		console.log(eventName + ":" + model);
          }
        };

  // Get the bounds from the map once it's loaded
  $scope.$watch(function() { return $scope.map.bounds; }, function() {
        var markers = [];
	getPopData();
    }, true);

 var createMarker = function (i, location, bounds, idKey) {
	var latitude = location['LAT'];
	var longitude = location['LNG'];
	var ret = {
		options: {draggable: true,
			labelAnchor: '10 39',
			labelContent: i,
			labelClass: 'labelMarker'
			},
		latitude: latitude,
		longitude: longitude,
		title: location['ULB_NAME']
	};
	ret["idKey"] = i;
	return ret;
 };


 var getPopData = function(){
    url = "/resources/TN_ULB_POP.json";
    var responsePromise = $http.get(url);

    responsePromise.success(function(data, status, headers, config) {      
	$scope.popData = data['data'];
	markers = [];
        for (var i = 0; i < $scope.popData.length; i++){
                markers.push(createMarker(i, $scope.popData[i], $scope.map.bounds, i))
        }
        $scope.markerModels = markers;
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.errorMessage = data;
    });  
  };






}]);
