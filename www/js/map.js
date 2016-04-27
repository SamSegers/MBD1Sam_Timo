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

/*document.addEventListener("deviceready", function() {
  mapLoaded = false;
  console.log('device ready map');
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);*/

function initMap(map){
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude},
		zoom: 16
	});
	mapLoaded = true;

	addMarkers(map);
}

function addMarkers(map){
	var latLng = {lat: positionObject.coords.latitude, lng: positionObject.coords.longitude};

	catchable.forEach(function(elem){
		console.log('adding '+elem.id+' to map');
		var latLng = {lat: elem.latitude, lng: elem.longitude};

		var circle = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: map,
			center: latLng,
			radius: 100
		});
	});
}
