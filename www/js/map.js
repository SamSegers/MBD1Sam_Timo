/* TODO: try getting phonegap plugin working
/*$(document).on('pagebeforeshow', '#map', function(){ 
  try{
    // Define a div tag with id="map_canvas"
    var mapDiv = document.getElementById("map_canvas");

    // Initialize the map plugin
    var map = plugin.google.maps.Map.getMap(mapDiv);

    // You have to wait the MAP_READY event.
    map.on(plugin.google.maps.event.MAP_READY, onMapInit);
  }catch(e){
    console.log(window);
    console.log(e);
  }
});*/

/*document.addEventListener("deviceready", function() {
  mapLoaded = false;
  console.log('device ready map');
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);*/

var map;
var mapLoaded;

$(document).on('pagebeforeshow', '#map', function(){ 
	if(!mapLoaded) loadMap();
});

function loadMap(){
	window.setTimeout(function(){
		console.log('loading map');
		if(positionObject.coords!=null){
			console.log('loaded map');
			$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBq3EHOwIKJHEZ0mOlPB-v5bXZXyX6SkYY&callback=initMap", function () {});
		}else loadMap();
	}, 1000);
}

function initMap(map){
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude},
		zoom: 16
	});
	mapLoaded = true;

	addMarkers(map);
	addUserMarker(map);
}

function addMarkers(map){
	var latLng = {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude};

	for(var i=0;i<catchable.length;i++){
		var pokemon = getPokemon(catchable[i]);

		var latLng = {lat: pokemon.latitude, lng: pokemon.longitude};

		var color = getMarkerColor(pokemon.id);

		pokemon.marker = new google.maps.Circle({
			strokeColor: color,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: color,
			fillOpacity: 0.35,
			map: map,
			center: latLng,
			radius: 100
		});

		console.log('added '+pokemon.id+' to map');
	}
}

function updateMarkerColor(pokemon){
	var color = getMarkerColor(pokemon.id);
	pokemon.marker.setOptions({strokeColor: color, fillColor: color});
}

function getMarkerColor(id){
	return caught.indexOf(id)==-1?'#ff0000':'#00ff00';
}

var userMarker;

function addUserMarker(map){
	var latLng = {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude};

	userMarker = new google.maps.Circle({
		strokeColor: '#0044FF',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#0044FF',
		fillOpacity: 0.35,
		map: map,
		center: latLng,
		radius: 10
	});

	console.log('added user marker');
}

function updateUserMarker(){
	if(positionObject!=null && userMarker!=null){
		var latLng = {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude};
		userMarker.setOptions({center: latLng});
	}
}
