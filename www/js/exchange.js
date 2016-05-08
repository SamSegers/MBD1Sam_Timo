function failure(err)
{
	console.log(err);
}

$(function(){
	console.log("test1");
ble.scan([], 5, function(device) {
    console.log(JSON.stringify(device));
}, failure);
console.log("test2");
});

