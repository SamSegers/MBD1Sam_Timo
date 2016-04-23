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

$(document).on('pagebeforeshow', '#map', function(){ 
});

document.addEventListener("deviceready", function() {
  console.log('device ready map');
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);

function onMapReady(map){
  console.log('on map init');
}
