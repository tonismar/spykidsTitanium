// return the list ui 
exports.launch = function() {
	var app = Ti.UI.createWindow({
		title: 'SpyKids'
	});
	
	var SECS = 4;
	var data = [];
	var defaultFontSize = Ti.Platform.name == 'android' ? 16 : 14;
	
	var tableView = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		headerTitle: 'Ocorrências'
	});
		
	var client = Ti.Network.createHTTPClient();
	var ocorrencias = [];
	
	client.onerror = function(e) {
		alert('Error ao recuperar ocorrências: ' + e.error);
	};
	
	/* Cada vez que esta tela receber o foco ela atualiza as informações de ocorrência */
	app.addEventListener('focus', function(e) {
		
		data = [];
		client.onload = function() { 
			
			var json = JSON.parse(this.responseText);
			var strUser = Ti.UI.createLabel({
				text: 'Nome: ',
				font: {fontWeight: 'bold'}
			});
			var strDia = Ti.UI.createLabel({
				text: 'Data: ',
				font: {fontWeight: 'bold'}
			});
			var strHora = Ti.UI.createLabel({
				text: 'Hora: ',
				font: {fontWeight: 'bold'}
			});
			
			for (var i=0; i < json.ocorrencias.length; i++) {
				var occ = require('/prototype/Ocorrencia');
				var protoOcorrencia = new occ(json.ocorrencias[i].id,
											json.ocorrencias[i].dia,
											json.ocorrencias[i].hora,
											json.ocorrencias[i].mensagem,
											json.ocorrencias[i].checked,
											json.ocorrencias[i].user,
											json.ocorrencias[i].imagem);
											
				ocorrencias.push(protoOcorrencia);
				 
				var row = Ti.UI.createTableViewRow({
					height: 50,
					title: 'Ocorrências',
					id: i
				});
				
				var user = Ti.UI.createLabel({
					text: strUser.text + json.ocorrencias[i].user,
					left: 4,
					top: 1
				});
				row.add(user);
	
				var dia = Ti.UI.createLabel({
					text: strDia.text + formatDate(json.ocorrencias[i].dia),
					left: 4,
					top: 22
				});
				row.add(dia);
				
				var hora = Ti.UI.createLabel({
					text: strHora.text + json.ocorrencias[i].hora,
					left: 164,
					top: 22
				});
				row.add(hora);
	
				data.push(row);
			}
			
			tableView.setData(data);
		};
		
		/* Ao clicar em um item da lista chama a tela de detalhes da ocorrência */
		tableView.addEventListener('click', function(e) {
			var win = require('ui/ocorrencia');
			var Ocorrencia = new win(ocorrencias[e.rowData.id]);
			//app.close();
			Ocorrencia.open();
		});
			
		client.setTimeout(30000);
		
		client.open('GET', 'http://spykids-tonismar.rhcloud.com/list.php?list=new');
		
		/* url acesso local, necessita editar o arquivo /etc/hosts do emulardor 
		client.open('GET', 'http://spykids.local/list.php?list=new'); */
		
		client.send();
		app.add(tableView);
	});
	
	var intent = Ti.Android.createServiceIntent({
		url : 'service/service.js'
	});
	
	/* Inicializa o serviço e verifica de 30 em 30 segundos */
	intent.putExtra('interval', 45000);
	var service = Ti.Android.createService(intent);
	service.start();
	
	app.open();
};

/* Formata data no formato brasileiro */
function formatDate(data){
	var d = data.split('-');
	return d[2]+'/'+d[1]+'/'+d[0];
}
