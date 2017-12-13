document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get('ufindServerAPI', function(result) {
			if(result.ufindServerAPI != undefined) {
				document.getElementById('ufindServerAPI').value = result.ufindServerAPI;
			}
	});
	document.getElementById('saveBtn').addEventListener('click', function(){
		var value = document.getElementById('ufindServerAPI').value
		chrome.storage.local.set({'ufindServerAPI': value}, function() {
		  console.log('ufindServerAPI saved');
		});
	});
	document.getElementById('getBtn').addEventListener('click', function(){
		chrome.storage.local.get('ufindServerAPI', function(result) {
			console.log(result);
			if(result.ufindServerAPI != undefined) {
				document.getElementById('ufindServerAPI').value = result.ufindServerAPI;
			}
		});
	});
});