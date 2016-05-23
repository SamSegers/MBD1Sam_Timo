let $bgColorSetting = $(".setting.background-color input[type='color']");
let $fgColorSetting = $(".setting.foreground-color input[type='color']");

function loadLanguageSettings()
{
	if(localStorage["language"])
	{
		var language = localStorage["language"];
	
		if(language == "Nederlands")
		{
			$("#lblLanguage").html("taal: ");
			$("#lblbgColor").html("achtegrond: ");
			$("#lblfgColor").html("voorgrond: ");
		}
		else if(language == "English")
		{
			$("#lblLanguage").html("language: ");
			$("#lblbgColor").html("background color: ");
			$("#lblfgColor").html("foreground color: ");
		}
	}
}

$('#slctLanguage').change(function(){
	
	var language = $('#slctLanguage').val();
	localStorage.setItem("language", language);
	loadLanguageSettings();
});

$(document).on('pagebeforeshow', '#settings', function(){ 
	$bgColorSetting.val(localStorage.background);
	$fgColorSetting.val(foregroundColor);
	loadLanguageSettings();
});

$bgColorSetting.change(function(){
	localStorage.background = $(this).val();
	$('body').css('background', localStorage.background);
});

$fgColorSetting.change(function(){
	localStorage.foreground = $(this).val();
	$('#settings > .wrapper').css('color', localStorage.foreground);
});

function defaultSettings(){
	console.log('todo default settings');
}
