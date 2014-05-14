// return the list ui 
exports.launch = function() {
	
	var data = [];
	var defaultFontSize = Ti.Platform.name == 'android' ? 16 : 14;
	var tableView = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		headerTitle: 'Ocorrências'
	});
	var app = Ti.UI.createWindow({
		title: 'SpyKids'
	});
	var client = Ti.Network.createHTTPClient();
	var ocorrencias = [];
	
	client.onerror = function(e) {
		alert('Error ao recuperar ocorrências: ' + e.error);
	};
	
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
		app.add(tableView);
	};
	
	tableView.addEventListener('click', function(e) {
		var win = require('ui/ocorrencia');
		var Ocorrencia = new win(ocorrencias[e.rowData.id]);
		Ocorrencia.open();
	});
	
	client.setTimeout(30000);
	client.open('GET', 'http://spykids.bl.ee/list.php?list=new');
	
	// url acesso local, necessita editar 
	// o arquivo /etc/hosts do emulardor
	//client.open('GET', 'http://spykids.local/list.php?list=new');
	client.send();
	app.open();
};

function formatDate(data){
	var d = data.split('-');
	return d[2]+'/'+d[1]+'/'+d[0];
}
