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
		
	.controller('pokemonCtrl', function($scope, pokemonSrv) {
		pokemonSrv.getPokemonJson().then(function(data){
			console.log(data);
			var doc = {};
			var pokemonObjects = data;
			for (var i = 0; i < pokemonObjects.length; i++) {
				console.log(pokemonObjects[i]);
				doc.name = pokemonObjects[i].name;
				doc.type = pokemonObjects[i].type;
				doc.trainer = pokemonObjects[i].trainer;
				doc.gender = pokemonObjects[i].gender;
				doc.owned = pokemonObjects[i].owned;
				console.log(doc);
				var json = JSON.stringify(doc);
				console.log(json);
				$.ajax({
					type:			'PUT',
					url:				'../../' + pokemonObjects[i].name,
					data:			json,
					contentType: 	'application/json',
					dataType:		'json',
					async:			true,
					success:		function(data){
						console.log('Load was performed.');
					},
					error:		function(XMLHttpRequest, textStatus, errorThrown){
						console.log(errorThrown); 
					}
				});
			}
		}, function(err) { 
			alert('Pokemon JSON file not found');
		});
		
		$('#searchButton').on('click', function(e) {
			if ($('#date1').val() != null && $('#date2').val() != null){
				$scope.pokemonTussenDatums = '';
				pokemonSrv.getPokemonJson().then(function(data){
					console.log(data);
					var pokemonObjects = data;
					var pokemonObjectsTussenDatums = [];
					for (var i = 0; i < pokemonObjects.length; i++) {
						if (pokemonObjects[i].owned > $('#date1').val() && pokemonObjects[i].owned < $('#date2').val()) {
							console.log(pokemonObjects[i]);
							pokemonObjectsTussenDatums.push(pokemonObjects[i]);
							$scope.pokemonTussenDatums = pokemonObjectsTussenDatums;
						}
					}
				});
			}
		});
    })
   
    .service('pokemonSrv', function($http, $q) {
    		this.getPokemonJson = function() {
	    		var q = $q.defer();
	    		var url = 'http://localhost:5984/pokemon/c8160e335ea664dcc2ae92c83f001521/pokemon.json';
	    		console.log(url);

	    		$http.get(url)
	    			.then(function(data){
	    				console.log(data);
	    				var pokemonJson = data.data.docs;
	    				console.log(pokemonJson);
	    				q.resolve(pokemonJson);
	    			}, function(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })