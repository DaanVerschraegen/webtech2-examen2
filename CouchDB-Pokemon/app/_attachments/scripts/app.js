'use strict'

angular.module('pokemonApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'pokemonCtrl'
	        })
	        .otherwise({redirectTo:'/home'});
	})
		
	.controller('pokemonCtrl', function($scope, pokemonSrv, saveSrv) {
    })
   
    .service('pokemonSrv', function($http, $q) {
    		this.getPokemon = function() {
	    		var q = $q.defer();
	    		var url = 'http://localhost:5984/pokemon/c8160e335ea664dcc2ae92c83f001521/pokemon.json';
	    		console.log(url);

	    		$http.get(url)
	    			.then(function(data){
	    				//console.log(data);
	    				var pokemonJson = data.data;
	    				//console.log(pokemonObjects);
	    				var pokemonObjects = [];
	    				pokemonObjects.push(pokemonJson);
	    				q.resolve(pokemonObjects);
	    				//
	    			}, function(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })
    
    .service('saveSrv', function($http, $q){
		  this.setObject = function(key, value){
			  $http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  var q = $q.defer();
			  $http.get('../../' + key)
	  			.then(function(data){
	  				q.resolve(data.data);
	  			}, function(err) {
	  				q.reject(err);
	  			});
  			
  			  return q.promise;
		  };
	});