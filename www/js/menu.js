$(document).on('pagebeforeshow', '#menu', function(){ 
	$("#menu .menu-pokemon").fadeOut(500);
	window.setTimeout(function(){
		initMenuRandomPokemon();
	}, 1000);

	$(".item.list").click(function(){
		//only fill if list is empty
		if(!$.trim($('#list').html())) fillList();
		$.mobile.navigate("#list", { transition : "slide", info: "info about the #list hash"});
	});

	$(".item.caught").click(function(){
		$.mobile.navigate("#caught", { transition : "slide", info: "info about the #caught hash"});
	});

	$(".item.map").click(function(){
		$.mobile.navigate("#map", { transition : "slide", info: "info about the #map hash"});
	});

	$(".item.exchange").click(function(){
		$.mobile.navigate("#exchange", { transition : "slide", info: "info about the #exchange hash"});
	});

	$(".menu-pokemon").click(function(){
		detailPokemonId = $(this).attr('data-id');
		$.mobile.navigate("#detail", { transition : "slide", info: "info about the #exchange hash"});
	});
});

function initMenuRandomPokemon(){
	var index = Math.floor(Math.random()*pokemonAmount);
	$.getJSON("http://pokeapi.co/api/v2/pokemon/?offset="+index+"&limit=1", function(pokemons){
		var segments = pokemons.results[0].url.split('/');
		var id = parseInt(segments[segments.length-2]);

		$("#menu .menu-pokemon")
			.attr("data-id", id)
			.attr("src",  "http://pokeapi.co/media/sprites/pokemon/"+id+".png")
			.fadeIn(1000);
	});
}

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
}
