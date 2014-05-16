if (!Ti.App.Properties.hasProperty('notification')) {
	Ti.App.Properties.setInt('notificationCount', 0);
} else {
	Ti.App.Properties.removeProperty('notificationCount');
	
	var activity = Ti.Android.currentActivity;
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_MAIN,
		url: 'app.js',
		flag: Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
	});
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
	
	var pending = Ti.Android.createPendingIntent({
		activity: activity,
		intent: intent,
		type: Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
		flags: Ti.Android.FLAG_ACTIVITY_NO_HISTORY
	});
	
	var notification = Ti.Android.createNotification({
		contentIntent: pending,
		contentTitle: 'Test',
		contentText: 'test',
		ticketText: 'Hello World, service',
		when: new Date().getTime(),
		flags: Ti.Android.ACTION_DEFAULT | Ti.Android.FLAG_AUTO_CANCEL | Ti.Android.FLAG_SHOW_LIGHTS
	});
	
	Ti.Android.NotificationManager.notify(1, notification);
	
	var service = Ti.Android.currentService;
	var serviceIntent = service.getIntent();
	var teststring = serviceIntent.getStringExtra('message');
	Ti.API.info('EXTRA: ' + teststring);
	Ti.Android.stopService(serviceIntent);
}
