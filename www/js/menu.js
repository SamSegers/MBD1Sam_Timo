$(function(){
	//TODO remove after implementing changed navigation
	window.setTimeout(function(){
		initMenuRandomPokemon();
	}, 3000);
});

$(".item.list").click(function(){
	window.location = 'list.html';
});

$(".item.catched").click(function(){
	window.location = 'catched.html';
});

$(".item.map").click(function(){
	window.location = 'map.html';
});

$(".item.exchange").click(function(){
	window.location = 'exchange.html';
});

$(".menu-pokemon").click(function(){
	localStorage.pokemonId = $(this).attr('data-id');
	window.location = 'detail.html';
});

function initMenuRandomPokemon(){
	var index = Math.floor(Math.random()*pokemonAmount);
	$.getJSON("http://pokeapi.co/api/v2/pokemon/?offset="+index+"&limit=1", function(pokemons){
		var segments = pokemons.results[0].url.split('/');
		var id = segments[segments.length-2];
		$(".menu-pokemon")
			.attr("data-id", id)
			.attr("src",  "http://pokeapi.co/media/sprites/pokemon/"+(index+1)+".png")
			.fadeIn(1000);
	});
}
