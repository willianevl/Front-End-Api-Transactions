# Growdev

# Front End da API de Transactions


const valor = JSON.stringify(ObjetoSelecionado);
localStorage.setItem('UsuarioEditar', valor);

const recuperar = localStorage.getItem('UsuarioEditar');
const user = JSON.parse(recuperar);