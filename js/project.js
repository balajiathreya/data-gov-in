
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
  $scope.lat = 42.51954;
  $scope.lon = -70.8967155;

  $scope.map = {
    center: {        
        latitude: $scope.lat,
        longitude: $scope.lon
    },
    options: { draggable: true },
    zoom: 6,
    events : {}
 };

}]);
