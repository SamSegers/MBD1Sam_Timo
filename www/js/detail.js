function loadLanguageDetails()
{
	if(localStorage["language"])
	{
		var language = localStorage["language"];
		if(language == "Nederlands")
		{
			$("#name").html("naam: ");
			$("#species").html("ras: ");
			$("#basexp").html("start xp:");
			$("#abilities").html("gaven: ");
			$("#height").html("lengte: ");
			$("#weight").html("gewicht: ");
		}
		else if(language == "English")
		{
			$("#name").html("name: ");
			$("#species").html("species: ");
			$("#basexp").html("base experience:");
			$("#abilities").html("abilities: ");
			$("#height").html("height: ");
			$("#weight").html("weight: ");
		}	
	}
}

$(document).on('pagebeforeshow', '#detail', function(){ 

	loadLanguageDetails();
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
		
		var url = "http://www.pokemon.com/us/pokedex/"+data.name;
		
		$rows.children('.link').text(url);
		//$rows.children('.link').attr("onclick","window.open('"+url+"', '_system');");
		$rows.children('.link').click(function(e) {
			window.open(url, '_system');
		});
		$('#detail > .loading').hide();
	});
}