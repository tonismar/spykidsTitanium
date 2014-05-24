if (!Ti.App.Properties.hasProperty('notificationCount')) {
	Ti.App.Properties.setInt('notificationCount', 0);
} else {
	Ti.App.Properties.removeProperty('notificationCount');
	
	var service = Ti.Android.currentService;
	//var intent = service.intent;
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_MAIN,
		url: 'app.js',
		flags: Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
	});
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
	
	var activity = Ti.Android.currentActivity;
	
	var pending = Ti.Android.createPendingIntent({
		activity: activity,
		intent: intent,
		type: Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
		flags: Ti.Android.FLAG_ACTIVITY_NO_HISTORY
	});
	
	var notification = Ti.Android.createNotification({
		contentIntent: pending,
		contentTitle: 'Spykdis',
		contentText: 'Novas ocorrências encontradas.',
		flags: Ti.Android.ACTION_DEFAULT | Ti.Android.FLAG_AUTO_CANCEL | Ti.Android.FLAG_SHOW_LIGHTS,
		defaults: Ti.Android.NotificationManager.DEFAULT_SOUND | Ti.Android.NotificationManager.DEFAULT_VIBRATE
	});
	

	var client = Ti.Network.createHTTPClient();
	client.onerror = function(e) {
		notification.setContentText('Erro ao recuperar ocorrências');
		Ti.Android.NotificationManager.notify(1, notification);
	};

	client.onload = function() {
		json = JSON.parse(this.responseText);

		if (json.ocorrencias.length > 0) {
			notification.setContentText('Novas ocorrências encontradas.');
			Ti.Android.NotificationManager.notify(1, notification);
		}
	};

	client.open('GET', 'http://spykids-tonismar.rhcloud.com/list.php?list=new');
	client.send();

	var serviceIntent = service.getIntent();
	Ti.Android.stopService(serviceIntent); 
}
