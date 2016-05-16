/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
        app.receivedEvent('deviceready');
    },
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener("deviceready", onDeviceReady, false);

let pokemonAmount;
let pokemons;
let detailPokemonId; // used for detail page
let caught; // caught pokemon
let catchable; // possible pokemon to catch
let $toast;
let foregroundColor;

$(function(){
	initForeground();
	loadPokemons();
	initPokemonAmount();
	initCaughtPokemon();
	initToast();
	$("body").removeClass('splashscreen');
	initBackground();
});

// Bind to the navigate event
$( window ).on( "navigate", function( event, data ) {
	//console.log( data.state.info );
	console.log( data.state.direction )
	console.log( data.state.url )
	//console.log( data.state.hash )
});


function onDeviceReady(){
	console.log('device ready');
	
	geolocation();
}

function initPokemonAmount(){
	$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=0', function(pokemons){
		pokemonAmount = pokemons.count;
	});
}

function initBackground(){
	if(localStorage.background==null) localStorage.background = '#ff0000';
	$('body').css('background', localStorage.background);
}

function initForeground(){
	if(localStorage.foreground==null) localStorage.foreground = '#000';
	$('#settings > .wrapper').css('color', localStorage.foreground);
}

function loadPokemons(){
	pokemons = [];

	$.ajax({
		url: "http://pokeapi.co/api/v2/pokemon/?limit=1000",
		async: false,
        success: function (data) {
			data.results.forEach(function(elem){
				var segments = elem.url.split('/');
				var id = parseInt(segments[segments.length-2]);
			
				pokemons.push({ 
					id: id,
					name: elem.name
				});
			});
        }
	})
}

function initCatchablePokemon(){
	catchable = [];

	// random locations around current location
	// using pokemon id 1 to 10
	for(var i=1;i<=10;i++){
		console.log('generate location '+i);

		var coords = getRandomCoords(positionObject.coords.latitude, positionObject.coords.longitude);

		//TODO pokemon class
		var pokemon = getPokemon(i);
		pokemon.latitude = coords.lat;
		pokemon.longitude = coords.lng;

		catchable.push(i);
	}
}

function initCaughtPokemon(){
	localStorage.setItem("caught", []); //TODO remove?
	if(localStorage["caught"]) caught = JSON.parse(localStorage.getItem("caught"));
	if(caught==null) caught = [];
	else{ // filter out duplicates
		var originalLength = caught.length;
		caught = caught.filter(function(item, pos) {
			return caught.indexOf(item) == pos;
		});
		// save to clean the storage from duplicates
		if(caught.length!=originalLength) localStorage.setItem("caught", JSON.stringify(caught));
	}
}

function initToast(){
	$toast = $("body > .toast");
	$toast.click(function(){
		updateDetailPage();
		$.mobile.navigate("#detail", { transition : "slide", info: "info about the #detail hash"});
	});
}

function getPokemon(id){
	return pokemons.filter(function(obj) {
		return obj.id == id;
	})[0];
}

function getRandomCoords(originalLat, originalLng){
	var r = 100/111300; // = 500 meters
	var y0 = originalLat;
	var x0 = originalLng;
	var u = Math.random();
	var v = Math.random();
	var w = r * Math.sqrt(u);
	var t = 2 * Math.PI * v;
	var x = w * Math.cos(t);
	var y1 = w * Math.sin(t);
	var x1 = x / Math.cos(y0);

	return {lat: y0 + y1, lng: x0 + x1};
}

var positionObject = {};

function geolocation(){
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	function onSuccess(position) {
		if ('coords' in position) {
			positionObject.coords = {};

			if ('latitude' in position.coords) positionObject.coords.latitude = position.coords.latitude;
			if ('longitude' in position.coords)	positionObject.coords.longitude = position.coords.longitude;
			if ('accuracy' in position.coords) positionObject.coords.accuracy = position.coords.accuracy;
			if ('altitude' in position.coords) positionObject.coords.altitude = position.coords.altitude;
			if ('altitudeAccuracy' in position.coords) positionObject.coords.altitudeAccuracy = position.coords.altitudeAccuracy;
			if ('heading' in position.coords) positionObject.coords.heading = position.coords.heading;
			if ('speed' in position.coords) positionObject.coords.speed = position.coords.speed;
		}

		if ('timestamp' in position) positionObject.timestamp = position.timestamp;

		// Use the positionObject instead of the position 'object'
		/*var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
							'Longitude: ' + position.coords.longitude     + '<br />' +
							'<hr />'      + element.innerHTML;*/

		if(catchable==null) initCatchablePokemon();
		if(catchable!=null) catchableReach(positionObject);
		updateUserMarker();
	}

	function catchableReach(position){
		for(var i=0;i<catchable.length;i++){
			var pokemon = getPokemon(catchable[i]);

			if(caught.indexOf(pokemon.id)==-1 // test if pokemon is not caught already
			&& pokemon.hasOwnProperty('latitude') && pokemon.hasOwnProperty('longitude') // test if pokemon can be caught
			&& measure(position.coords.latitude, position.coords.longitude, pokemon.latitude, pokemon.longitude)<=100){ // test if pokemon is in 110 meter distance radius
				//navigator.vibrate(3000); TODO uncomment

				caught.push(pokemon.id);
				localStorage.setItem("caught", JSON.stringify(caught));
				console.log(caught);

				detailPokemonId = pokemon.id;
				$toast.find("span").text("caught "+pokemon.name+"!");
				$toast.find('img').attr('src', "http://pokeapi.co/media/sprites/pokemon/"+pokemon.id+".png");
				$toast.fadeIn(1000, function(){
					window.setTimeout(function(){
						$toast.fadeOut(1000, function(){
							$toast.find('img').attr('src', null);
							updateMarkerColor(pokemon);	
						});
					}, 8000);
				});
				break;
			}
		};
	}

	function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
		var R = 6378.137; // Radius of earth in KM
		var dLat = (lat2 - lat1) * Math.PI / 180;
		var dLon = (lon2 - lon1) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return d * 1000; // meters
	}

	// onError Callback receives a PositionError object
	//
	function onError(error) {
		console.log('code: '+error.code+'\n'+'message: '+error.message+'\n');
	}

	if(!navigator.geolocation) 
		console.log("Error: Plugin not working!");
	else{
		// Options: throw an error if no update is received every 30 seconds.
		//
		//var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

		window.setInterval(function(){
			navigator.geolocation.getCurrentPosition(onSuccess, onError, false);
		}, 15000);
	}
}
