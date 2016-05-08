$(document).on('pagebeforeshow', '#detail', function(){ 
	console.log('detail');
	loadCaughtPokemon();
});


function loadCaughtPokemon(){
	console.log('detail 2');
	/*var t = localStorage.getItem("caught");
	if(t == "") return;
	var caught = JSON.parse(localStorage.getItem("caught"));
	if(caught==null) caught = [];*/
	console.log(caught);
	 
	for (var i = 0; i < caught.length; i++) {
		$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=1&offset='+caught[i], function(pokemon){
			var html = '';
			var odd = false;
			var nextUrl = pokemons.next;

			pokemon.results.forEach(function(elem){
				var segments = elem.url.split('/');
				var id = segments[segments.length-2];
				html += "<div class='item"+(odd?" odd":'')+"' data-id='"+id+"'>";
				html += "<img src='http://pokeapi.co/media/sprites/pokemon/"+id+".png'/>";
				html += "<span>"+elem.name+"</span>";
				html += "</div>";
				odd ^= true;
			});
			$('#caught').append(html);
		});
	}
}
