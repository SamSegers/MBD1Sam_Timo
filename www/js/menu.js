function loadLanguageMenu()
{
	if(localStorage["language"])
	{
		var language = localStorage["language"];
		if(language == "Nederlands")
		{
			$("#listpkmn").html("lijst");
			$("#caught").html("gevangen");
			$("#map").html("kaart");
			$("#settings").html("instellingen");
		}
		else if(language == "English")
		{
			$("#listpkmn").html("list");
			$("#caught").html("caught");
			$("#map").html("map");
			$("#settings").html("settings");
		}	
	}
}

$(document).on('pagebeforeshow', '#menu', function(){ 
	loadLanguageMenu();
	$("#menu .menu-pokemon").fadeOut(500);
	window.setTimeout(function(){
		initMenuRandomPokemon();
	}, 1000);

	$(".menu > .item").click(function(){
		let page = $(this).attr('data-nav');

		//only fill if list is empty
		if(page=='list' && !$.trim($('#list').html())) fillList();

		$.mobile.navigate("#"+page, { transition : "slide", info: "info about the #"+page+" hash"});
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
