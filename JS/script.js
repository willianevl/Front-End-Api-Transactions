window.addEventListener('load', () => {
    // Todos os elementos do dom e scripts estão disponíveis
    axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        ImprimirDadosDoUsuárioEmTabela(response.data.data);
    });

    axios.get('https://growdev-api-transactions.herokuapp.com/users').then((response) => {
        let data = response.data.data;
        data.forEach((userInf) => {
            InformaçõesDosUsuarios.push(userInf);
        });
    });

    // linha 141. Atualiza as tranferencias do usuario
    ATTInfTranferenciasDoUsuario();
});

const InformaçõesDosUsuarios = [];
console.log(InformaçõesDosUsuarios)

function AbrirEmOutraURL(href){
    return window.location.href = `${href}`;
}

function mostrarModalDeErroAoCriarusuario(){
    var myModal = new bootstrap.Modal(document.getElementById('modalErrorAoCriarUsuario'), {});
    myModal.show();
}


async function mostrarModalSuccess(){
    var myModal = new bootstrap.Modal(document.getElementById('Success'), {});
    myModal.show();

    const data =  await axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        return (response.data.data);
    });

    document.getElementById('mensagemUsuario').innerHTML = `Olá, ${data[data.length -1].name}. Seja bem vindo(a), assegure-se de não perder o ID, ele será seu método de acesso.`
    document.getElementById('MostrarID').innerHTML = data[data.length -1].id;


    document.getElementById('btnModalContaCriada').addEventListener('click', function(){
        AbrirEmOutraURL('index.html');
    });
}



function CriarUmNovoUsuario(){
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const cpf = document.getElementById('cpf').value;

    const NewUser = axios.post('https://growdev-api-transactions.herokuapp.com/users', {name: name, cpf: cpf, email: email, age: age});

    const UsuarioJáExiste = InformaçõesDosUsuarios.find((f) => {
        return f.cpf === cpf
    });

    if(UsuarioJáExiste){
        return mostrarModalUsuarioJáExiste();
    }
    
    NewUser.catch(() => mostrarModalDeErroAoCriarusuario());
    NewUser.then(() =>  mostrarModalSuccess());
};


function mostrarModalUsuarioJáExiste(){
    var myModal = new bootstrap.Modal(document.getElementById('modalUsuarioJáExiste'), {});
    myModal.show();

}


function mostrarUsuarioNãoEncontrado(){
    var myModal = new bootstrap.Modal(document.getElementById('userNotFound'), {});
    myModal.show();
}

function validarUserIDParaLogin(){
    let UserID = document.getElementById('UserId').value;
    if(UserID === ''){
        return mostrarUsuarioNãoEncontrado();
    }
}

function logarTelaDoUsuario(){
    let UserID = document.getElementById('UserId').value;
    const admID = '53f47ca2-8d5e-44d6-9c56-0ba3e3720ec8';

    if(UserID === admID){
        AbrirEmOutraURL('ADMusers.html')
    }

    validarUserIDParaLogin();

    const logar = axios.get(`https://growdev-api-transactions.herokuapp.com/users/${UserID}`);
    logar.catch(() => mostrarUsuarioNãoEncontrado());

    const user = InformaçõesDosUsuarios.find((f) => {
        return f.id === UserID
    });

    logar.then(() => {
        if(user){
           AbrirEmOutraURL('usuarioPag.html') 
        }
    });

    const userInf = JSON.stringify(user);
    localStorage.setItem('UsuarioInf', userInf);
}

function modalComIDinf(){
    var myModal = new bootstrap.Modal(document.getElementById('modalIDinf'), {});
    myModal.show();
}

// Adiciona dados do usuario ao carrega a pagina do usuario com seus dados
window.addEventListener('load', () => {
    const recuperar = localStorage.getItem('UsuarioInf');
    const user = JSON.parse(recuperar);

    const id = document.getElementById('idDoUsuario');
    const name = document.getElementById('userNAME');
    const cpf = document.getElementById('userCPF');
    const email = document.getElementById('userEMAIL');
    const idade = document.getElementById('userAGE');
        
    id.innerHTML = `${user.id}`;
    name.innerHTML = `${user.name}`;
    cpf.innerHTML = `${user.cpf}`;
    email.innerHTML = `${user.email}`;
    idade.innerHTML = `${user.age}`;
});

async function ATTInfTranferenciasDoUsuario(){
    const recuperar = localStorage.getItem('UsuarioInf');
    const user = JSON.parse(recuperar);

    const dados = document.getElementById('tableBodyTranferencias');
    const totais = document.getElementById('tableFooterTranferencias');

    const transactions = await axios.get(`https://growdev-api-transactions.herokuapp.com/users/${user.id}/transactions`).then((response) => response.data)

    let i = 1;
    (transactions.transactions).forEach((transf) => {
        dados.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${transf.id}</td>
                <td>${transf.title}</td>
                <td>${transf.value}</td>
                <td>${transf.type}</td>
            </tr>
        `;
        i++
    });

    totais.innerHTML += `
        <tr>
            <th>#</th>
            <th>Total de Entradas: ${transactions.totalIncome}</th>
            <th>Total de Saídas: ${transactions.totalOutcome}</th>
            <th>Total: ${transactions.total}</th>
        </tr>
    `
}

function AbrirModalParaFazerTransação() {
    var myModal = new bootstrap.Modal(document.getElementById('modalCriarTransação'), {});
    myModal.show();
}

async function CriarNovaTransação(){
    const recuperar = localStorage.getItem('UsuarioInf');
    const user = JSON.parse(recuperar);

    const UsuarioID = document.getElementById('TranferIDdoUsuario').value = user.id;

    const NomeDaTransação = document.getElementById('NomeDaTransação').value;
    const ModeloDaTransação = document.getElementById('ModeloDaTransação').value;
    const ValorDaTransação = document.getElementById('ValorDaTransação').value;

    const NewTransaction = axios.post(`https://growdev-api-transactions.herokuapp.com/user/${UsuarioID}/transactions`, { title: NomeDaTransação, value: parseInt(ValorDaTransação), type: ModeloDaTransação});

    NewTransaction.catch(() => AbrirModalFalhaAoCriarTranferência());
    NewTransaction.then(() => {
        document.getElementById('TransaçãoSucesso').innerHTML = `A transação ${NomeDaTransação} com o modelo ${ModeloDaTransação} e o valor de R$${parseInt(ValorDaTransação)} foi realizada com sucesso.`
        AbrirModalSucessoAoCriarTranferência();

        
        document.getElementById('TransferCriada').addEventListener('click', () => {
            AbrirEmOutraURL('transfer.html')
        });
    });

}

function AbrirModalSucessoAoCriarTranferência(user){
    var myModal = new bootstrap.Modal(document.getElementById('modalSuccessTranfer'), {});
    myModal.show();
}

function AbrirModalFalhaAoCriarTranferência(){
    var myModal = new bootstrap.Modal(document.getElementById('modalFailTranfer'), {});
    myModal.show();
}

// Remove os dados do usuario do local storage
function LogoutUser(){
    localStorage.removeItem('UsuarioInf');
    return AbrirEmOutraURL('index.html');
}

function ImprimirDadosDoUsuárioEmTabela(data){
    const dados = document.getElementById('tableBody');
    
    let i = 1;
    let newContent = "";
    let indice = 0;

    data.forEach((user) => {
        newContent += `
            <tr>
                <td>${i}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.cpf}</td>
                <td><button class='table-btn-editar' onclick='editarUsuario(${indice})'>Editar</button></td>
                <td><button class='table-btn-excluir' onclick='excluirUsuario(${indice})'>Excluir</button></td>
            </tr>
        `;
        i++
        indice++
    });

    dados.innerHTML = newContent;
}


function AbrirModalParaCriarUsuario(){
    mostrarModalADMCriarUsuario();
}

function ADMCriarUmNovoUsuario(){
    const ADMemail = document.getElementById('ADMemail').value;
    const ADMname = document.getElementById('ADMname').value;
    const ADMcpf = document.getElementById('ADMcpf').value;
    const ADMage = document.getElementById('ADMage').value;
    
    const NewUserByADM = axios.post('https://growdev-api-transactions.herokuapp.com/users', {name: ADMname, cpf: ADMcpf, email: ADMemail, age: ADMage})

    const UsuarioJáExiste = InformaçõesDosUsuarios.find((f) => {
        return f.cpf === ADMcpf
    });

    if(UsuarioJáExiste){
        return mostrarModalUsuarioJáExiste();
    }
    
    NewUserByADM.catch(() => mostrarModalDeErroAoCriarusuario());
    NewUserByADM.then(() =>  mostrarModalSuccessADM() && AbrirEmOutraURL('ADMusers.html'));
}

function mostrarModalSuccessADM(){
    var myModal = new bootstrap.Modal(document.getElementById('ADMSuccess'), {});
    myModal.show();

    document.getElementById('ADMSuccess').addEventListener('click', () => AbrirEmOutraURL('ADMusers.html'));
}

function mostrarModalADMCriarUsuario(){
    var myModal = new bootstrap.Modal(document.getElementById('ADMCriaNovoUsuario'), {});
    myModal.show();
}

async function editarUsuario(indice){
    ModalAtualizarDadosUsuario();

    const data = await axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        return (response.data.data);
    });

    const ObjetoSelecionado = data[indice].id;

    document.getElementById('ADMemailATT').value = ObjetoSelecionado.email;
    document.getElementById('ADMnameATT').value = ObjetoSelecionado.name;
    document.getElementById('ADMcpfATT').value = ObjetoSelecionado.cpf;
    document.getElementById('ADMageATT').value = ObjetoSelecionado.age;

    const valor = JSON.stringify(ObjetoSelecionado);
    localStorage.setItem('UsuarioEditar', valor);
}

async function AtualizarDadosDoUsuario(){
    const ADMemail = document.getElementById('ADMemailATT').value;
    const ADMname = document.getElementById('ADMnameATT').value;
    const ADMcpf = document.getElementById('ADMcpfATT').value;
    const ADMage = document.getElementById('ADMageATT').value;

    const recuperar = localStorage.getItem('UsuarioEditar');
    const user = JSON.parse(recuperar);

    const ATT = axios.put(`https://growdev-api-transactions.herokuapp.com/users/${user.id}`, {name: ADMname, email: ADMemail, cpf: ADMcpf, age: ADMage});

    ATT.catch(() => modalErrorAoATTUsuario());
    ATT.then(() => {
        AbrirEmOutraURL('ADMusers.html')
    });
}

function modalErrorAoATTUsuario(){
    var myModal = new bootstrap.Modal(document.getElementById('modalErrorAoATTUsuario'), {});
    myModal.show();

    document.getElementById('AbrirModalATTUser').addEventListener('click', () => [
        ModalAtualizarDadosUsuario()
    ]);
}

function ModalAtualizarDadosUsuario() {
    var myModal = new bootstrap.Modal(document.getElementById('ADMModificarNovoUsuario'), {});
    myModal.show();
}

async function excluirUsuario(indice){
    const data = await axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        return (response.data.data);
    });

    const ObjetoSelecionado = data[indice].id;

    const user = JSON.stringify(ObjetoSelecionado);
    localStorage.setItem('UsuarioExcluir', user);

    document.getElementById('textExcluirUsuario').innerHTML = `Você deseja excluir o usuário: ${data[indice].name}, cpf: ${data[indice].cpf}?`;

    AbrirModalParaExcluirUsuario();
}

async function VerificarExcluirUsuario(){
    const recuperar = localStorage.getItem('UsuarioExcluir');
    const user = JSON.parse(recuperar);

   await axios.delete(`https://growdev-api-transactions.herokuapp.com/users/${user}`);

    AbrirEmOutraURL('ADMusers.html');
}

function AbrirModalParaExcluirUsuario() {
    var myModal = new bootstrap.Modal(document.getElementById('modalVerificarSeQuerExcluir'), {});
    myModal.show();
}

function AbrirModalParaSelecionarUsuario() {
    var myModal = new bootstrap.Modal(document.getElementById('modalOnloadTranfer'), {});
    myModal.show();
}


function LogoutADMpage(){
    AbrirEmOutraURL('index.html')
}

