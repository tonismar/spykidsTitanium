function Ocorrencia(id, dia, hora, mensagem, checked, user, imagem ) {
	this.id = id;
	this.dia = dia;
	this.hora = hora;
	this.mensagem = mensagem;
	this.checked = checked;
	this.user = user;
	this.imagem = imagem;
}

// get id value
Ocorrencia.prototype.getId = function() {
	return this.id;
};
// get dia value
Ocorrencia.prototype.getDia = function() {
	return this.dia;
};
// get hora value
Ocorrencia.prototype.getHora = function() {
	return this.hora;
};
// get mensagem value
Ocorrencia.prototype.getMensagem = function() {
	return this.mensagem;
};
// get checked value
Ocorrencia.prototype.getChecked = function() {
	return this.checked;
};
// get user value
Ocorrencia.prototype.getUser = function() {
	return this.user;
};
// get imagem value
Ocorrencia.prototype.getImagem = function() {
	return this.imagem;
};

module.exports = Ocorrencia;