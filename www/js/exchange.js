function onError(reason) {
        console.log("ERROR: " + reason);
    }

function onDiscoverDevice(device) {
        /*var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' +
                'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                device.id;

        listItem.dataset.deviceId = device.id;
        listItem.innerHTML = html;
        deviceList.appendChild(listItem);*/
    }


$(function(){
	consol.log("test1");
 ble.scan([], 5, onDiscoverDevice, onError);
 console.log("test2");
});
