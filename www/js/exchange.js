$(function(){
	window.bluetooth.isEnabled(isEnabledSuccess, isEnabledError);
	enableBluetooth();
});


function checkBluetoothStatus() {
        window.bluetooth.isEnabled(isEnabledSuccess, isEnabledError);
    }

function isEnabledSuccess(isEnabled){
}

function isEnabledError(error){

}

function enableBluetooth()
{
	window.bluetooth.enable(isEnabledSuccess, isEnabledError);
}