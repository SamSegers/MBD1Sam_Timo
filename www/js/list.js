$(function(){
	console.log('amount '+pokemonAmount);
	loadPokemon(0);
});

// click on item in list, go to detail page
$("#list").on("click", ".item", function(){
	pokemonId = $(this).attr('data-id');
	$.mobile.navigate( "#detail", { transition : "slide", info: "info about the #detail hash" });
});

function loadPokemon(index){
	if(index<811){
		$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=100&offset='+index, function(pokemons){
			var html = '';
			var odd = false;
			var nextUrl = pokemons.next;
			pokemons.results.forEach(function(elem){
				var segments = elem.url.split('/');
				var id = segments[segments.length-2];
				html += "<div class='item"+(odd?" odd":'')+"' data-id='"+id+"'>";
				html += "<img src='http://pokeapi.co/media/sprites/pokemon/"+(index+1)+".png'/>";
				html += "<span>"+elem.name+"</span>";
				html += "</div>";
				odd ^= true;
				index++;
			});
			$('#list').append(html);
			loadPokemon(index);
		}); 
	}
}
