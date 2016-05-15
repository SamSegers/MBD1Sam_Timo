$(document).on('pagebeforeshow', '#detail', function(){ 
	updateDetailPage();
	$(document).on( "swipeleft", function(){
		detailPokemonId -= 1;
		if(detailPokemonId == 0)
		{
			detailPokemonId = 1;
		}
		updateDetailPage();
	});
	$(document).on( "swiperight", function(){
	
		detailPokemonId += 1;
		if(detailPokemonId == 811)
		{
			detailPokemonId = 810;
		}
	
		updateDetailPage();
	});
});

function updateDetailPage(){
	$('#detail > .loading').show();
	$.getJSON("http://pokeapi.co/api/v2/pokemon/"+detailPokemonId, function(data){
		$('#detail > .avatar').attr('src', "http://pokeapi.co/media/sprites/pokemon/"+detailPokemonId+".png");
		$rows = $('#detail > .row');
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
		$rows.children('.link').text("http://www.pokemon.com/us/pokedex/"+data.name);
		$rows.children('.link').click(function(e) {
			if (typeof navigator !== "undefined" && navigator.app)
			{
				navigator.app.loadUrl('http://www.google.com/', {openExternal: true});
			}
			else
			{
				window.open('http://www.pokemon.com/us/pokedex/'+data.name, '_system');
			}
		});
		$('#detail > .loading').hide();
	});
}