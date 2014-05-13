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
	image : 'http://spykids.bl.ee/img/' + occ.getImagem()
});

var user = Ti.UI.createLabel({
	text : occ.getId(),
	top : 160,
	//left : 145,
	center : true,
	textAlign : 'center'
});

var message = Ti.UI.createLabel({
	text : occ.getMensagem(),
	top : 170,
	//left : 80,
	width: 140,
	height: 140,
	center: true,
	textAlign: 'center',
	wordWrap: true 
});

var btn = Ti.UI.createButton({
	title: 'Visualizada',
	textAlign: 'center',
	top: 320
});

view.add(avatar);
view.add(user);
view.add(message);
view.add(btn);
self.add(view); 

return self;
}

module.exports = ocorrencia;