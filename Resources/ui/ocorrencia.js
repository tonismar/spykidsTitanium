function ocorrencia(occ) {
	var self = Ti.UI.createWindow({
		orientation: 'vertical',
		title: 'SpyKids'
	});
	var view = Ti.UI.createView();
	
	var avatar = Ti.UI.createImageView({
		height : 150,
		width : 150,
		top : 4,
		left : 80,
		image : 'http://spykids-tonismar.rhcloud.com/img/' + occ.getImagem()
	});
	
	var user = Ti.UI.createLabel({
		text : occ.getUser(),
		top : 160,
		center : true,
		textAlign : 'center',
		font : { fontWeight: 'bold' }
	});
	
	var detail = Ti.UI.createLabel({
		text: formatDate(occ.getDia()) + ' - ' + occ.getHora(),
		top: 180,
		font: { fontSize: 10 },
		center: true,
		textAlign: 'center' 
	});
	
	var message = Ti.UI.createLabel({
		text : occ.getMensagem(),
		top : 170,
		width: 140,
		height: 140,
		center: true,
		textAlign: 'center',
		wordWrap: true 
	});
	
	var btn = Titanium.UI.createButton({
		title: 'Visualizada',
		textAlign: 'center',
		top: 320
	});
	
	view.add(avatar);
	view.add(user);
	view.add(detail);
	view.add(message);
	view.add(btn);
	self.add(view); 

	btn.addEventListener('click', function() {

		var update = Ti.Network.createHTTPClient();
		update.onerror = function(e) {
			alert('Erro ao marcar ocorrência como visualizada.');
		};
		
		update.onload = function() {
			var json = JSON.parse(this.responseText);
			if (json.ocorrencias = 'Success') {
				alert('Ocorrência visualizada.');
				self.close();
				var app = require('/ui/list');
				app.launch();
			};
		};
		
		update.open('GET', 'http://spykids-tonismar.rhcloud.com/list.php?update=' + occ.getId());
		update.send();
	});	
	
	self.addEventListener('blur', function(e) {
		var app = require('/ui/list');
		app.launch();
	});
	return self;
}

module.exports = ocorrencia;

function formatDate(data){
	var d = data.split('-');
	return d[2]+'/'+d[1]+'/'+d[0];
}
