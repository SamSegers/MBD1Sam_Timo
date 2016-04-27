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

var pokemonAmount;
var pokemonId; // used for detail page
var catched; // catched pokemon
var catchable; // possible pokemon to catch

$(function(){
	initPokemonAmount();
	initPokemon();
	initCatchedPokemon();
	$("body").prepend("<div class='toast'><span></span></div>");
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

function initCatchedPokemon(){
	catched = JSON.parse(localStorage.getItem("catched"));
	if(catched==null) catched = [];
	else{ // filter out duplicates
		var originalLength = catched.length;
		catched = catched.filter(function(item, pos) {
			return catched.indexOf(item) == pos;
		});
		if(catched.length!=originalLength) localStorage.setItem("catched", JSON.stringify(catched));
	}
	console.log(catched);
}

//TODO randomize locations
//TODO test if pokemon isn't catched
//TODO pokemon class
function initPokemon(){
	catchable = [];
	
	catchable.push({id: 1, latitude: 51.957511, longitude: 5.244361});

	// random locations around current location
	var margin = 1000;
	for(var i=2;i<10;i++){
		console.log('generate '+i);
		var coords = getRandomCoords(catchable[0].latitude, catchable[0].longitude);
		var lat = catchable[0].latitude-margin/2+Math.floor(Math.random()*margin);
		var lng = catchable[0].longitude-margin/2+Math.floor(Math.random()*margin);

		catchable.push({
			id: i, 
			latitude: coords.lat, 
			longitude: coords.lng
		});
	}
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

		catchableReach(positionObject);
	}

	function catchableReach(position){
		catchable.forEach(function(pokemon){
			if(catched.indexOf(pokemon.id)==-1 // test if pokemon is not catched already
			&& measure(position.coords.latitude, position.coords.longitude, pokemon.latitude, pokemon.longitude)<=110){ // test if pokemon is in 110 meter distance radius
				catched.push(pokemon.id);
				console.log(catched);
				localStorage.setItem("catched", JSON.stringify(catched));

				var $toast = $("body > .toast");
				$toast.children("span").text("catched pokemon "+pokemon.id);
				$toast.fadeIn(2000);
				window.setTimeout(function(){
					$toast.fadeOut(2000);	
					//TODO set toast on click to pokemon detail
				}, 10000);
			}
		});
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
		}, 20000);
	}
}
