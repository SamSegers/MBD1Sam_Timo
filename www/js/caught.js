$(document).on('pagebeforeshow', '#caught', function(){ 
	loadCaughtPokemon();
});

// click on item in list, go to detail page
$("#caught").on("click", ".item", function(){
	detailPokemonId = $(this).attr('data-id');
	$.mobile.navigate( "#detail", { transition : "slide", info: "info about the #detail hash" });
});

function loadCaughtPokemon(){
	var html = '';
	var odd = false;
	console.log('hmm');
	for(var i=0;i<caught.length;i++){
		var pokemon = getPokemon(caught[i]);
		html += "<div class='item"+(odd?" odd":'')+"' data-id='"+pokemon.id+"'>";
		html += "<img src='http://pokeapi.co/media/sprites/pokemon/"+pokemon.id+".png'/>";
		html += "<span>"+pokemon.name+"</span>";
		html += "</div>";
		odd ^= true;
	}
	$('#caught').html(html);
}
