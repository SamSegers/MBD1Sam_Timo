$(document).on('pagebeforeshow', '#menu', function(){ 
	$("#menu .menu-pokemon").fadeOut(500);
	window.setTimeout(function(){
		initMenuRandomPokemon();
	}, 1000);

	$(".item.list").click(function(){
		$.mobile.navigate( "#list", { transition : "slide", info: "info about the #list hash" });
	});

	$(".item.catched").click(function(){
		$.mobile.navigate( "#catched", { transition : "slide", info: "info about the #catched hash" });
	});

	$(".item.map").click(function(){
		$.mobile.navigate( "#map", { transition : "slide", info: "info about the #map hash" });
	});

	$(".item.exchange").click(function(){
		$.mobile.navigate( "#exchange", { transition : "slide", info: "info about the #exchange hash" });
	});

	$(".menu-pokemon").click(function(){
		pokemonId = $(this).attr('data-id');
		$.mobile.navigate( "#detail", { transition : "slide", info: "info about the #exchange hash" });
	});
});

function initMenuRandomPokemon(){
	var index = Math.floor(Math.random()*pokemonAmount);
	$.getJSON("http://pokeapi.co/api/v2/pokemon/?offset="+index+"&limit=1", function(pokemons){
		var segments = pokemons.results[0].url.split('/');
		var id = segments[segments.length-2];
		$("#menu .menu-pokemon")
			.attr("data-id", id)
			.attr("src",  "http://pokeapi.co/media/sprites/pokemon/"+(index+1)+".png")
			.fadeIn(1000);
	});
}
