$(function(){
	//console.log('AMOUNT '+pokemonAmount);
	//loadPokemon(0);
});

// click on item in list, go to detail page
$("#list").on("click", ".item", function(){
	pokemonId = $(this).attr('data-id');
	$.mobile.navigate( "#detail", { transition : "slide", info: "info about the #detail hash" });
});

//var limit = 100;

function fillList(){
	console.log('fill list');

	var odd = false;

	for(var i=0;i<pokemons.length;i++){
		var id = pokemons[i].id;

		var html = "<div class='item"+(odd?" odd":'')+"' data-id='"+id+"'>";
		html += "<img src='http://pokeapi.co/media/sprites/pokemon/"+id+".png'/>";
		html += "<span>"+pokemons[i].name+"</span>";
		html += "</div>";

		$('#list').append(html);

		odd ^= true;
	}
	
	console.log('list done');
}

/*function loadPokemon(index){
	if(index<811){
		$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit='+limit+'&offset='+index, function(pokemons){
			var html = '';
			var odd = false;
			var nextUrl = pokemons.next;
			pokemons.results.forEach(function(elem){
				var segments = elem.url.split('/');
				var id = segments[segments.length-2];
				html += "<div class='item"+(odd?" odd":'')+"' data-id='"+id+"'>";
				html += "<img src='http://pokeapi.co/media/sprites/pokemon/"+id+".png'/>";
				html += "<span>"+elem.name+"</span>";
				html += "</div>";
				odd ^= true;
			});
			index+=limit;
			$('#list').append(html);
			loadPokemon(index);
		}); 
	}
}*/
