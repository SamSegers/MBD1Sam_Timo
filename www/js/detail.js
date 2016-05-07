$(document).on('pagebeforeshow', '#detail', function(){ 
	updateDetailPage();
});

function updateDetailPage(){
	$.getJSON("http://pokeapi.co/api/v2/pokemon/"+detailPokemonId, function(data){
		$rows = $('#detail > .row');
		$('#detail > img').attr('src', "http://pokeapi.co/media/sprites/pokemon/"+detailPokemonId+".png");
		$rows.children('.name').text(data.name);
		$rows.children('.species').text(data.species.name);
		$rows.children('.base-experience').text(data.base_experience);
		
		var text = ''
		for(var i=0; i<data.abilities.length; i++){
			text += (i!=0?', ':'')+data.abilities[i].ability.name;
		}
		$rows.children('.abilities').text(text);

		text = '';
		for(var i=0; i<data.types.length; i++){
			text += (i!=0?', ':'')+data.types[i].type.name;
		}
		$rows.children('.types').text(text);
		$rows.children('.height').text(data.height);
		$rows.children('.weight').text(data.weight);
	});
}
