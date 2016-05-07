// click on item in list, go to detail page
$("#list").on("click", ".item", function(){
	detailPokemonId = $(this).attr('data-id');
	$.mobile.navigate( "#detail", { transition : "slide", info: "info about the #detail hash" });
});

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
