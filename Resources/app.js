/*
var app = require('/ui/list');
app.launch();
*/

// tempo de intervalo para checar novas ocorrencias
SECS = 120;
var win = Ti.UI.createWindow({
	backgroundColor: 'gray',
	orientation: 'vertical'
});

win.addEventListener('open', function(e) {
	var intent = Ti.Android.createServiceIntent({
		url: '/ui/list.js'
	});
	intent.putExtra('interval', SECS * 1000);
	intent.putExtra('message', 'Testing...');
	Ti.Android.startService(intent);
});

win.open();
