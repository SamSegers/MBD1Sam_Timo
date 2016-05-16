let $bgColorSetting = $(".setting.background-color input[type='color']");
let $fgColorSetting = $(".setting.foreground-color input[type='color']");

$(document).on('pagebeforeshow', '#settings', function(){ 
	$bgColorSetting.val(localStorage.background);
	$fgColorSetting.val(foregroundColor);
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
