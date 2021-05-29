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


function mostrarModalSuccess(){
    var myModal = new bootstrap.Modal(document.getElementById('Success'), {});
    myModal.show();

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

function logarEImprimirDadosNaTelaDoUsuario(){
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
}

function modalComIDinf(){
    var myModal = new bootstrap.Modal(document.getElementById('modalIDinf'), {});
    myModal.show();
}

// Adiciona dados do usuario ao carregar a pagina do usuario
// function Imprimirdados () {
//     const user = InformaçõesDosUsuarios.find((f) => {
//         return f.id === UserID
//     });

//     const id = document.getElementById('idDoUsuario');
//     const name = document.getElementById('userNAME');
//     const cpf = document.getElementById('userCPF');
//     const email = document.getElementById('userEMAIL');
//     const idade = document.getElementById('userAGE');
        
//     id.innerHTML = `${user.id}`;
//     name.innerHTML = `${user.name}`;
//     cpf.innerHTML = `${user.cpf}`;
//     email.innerHTML = `${user.email}`;
//     idade.innerHTML = `${user.age}`;
// }


// document.getElementById('logoutUserPage').addEventListener('click', () => {

// });

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
    NewUserByADM.then(() =>  mostrarModalSuccessADM());
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
    const data = await axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        return (response.data.data);
    });

    ModalAtualizarDadosUsuario();

    const objetoSelected = data[indice];

    //pq ta chamando a função aqui e ela ta sendo executada
    AtualizarDadosDoUsuario(objetoSelected);
}

// TA DANDO ERRO PQ TA INDO ANTES OS DADOS
function AtualizarDadosDoUsuario(data){
    const ADMemail = document.getElementById('ADMemailATT').value = data.email;
    const ADMname = document.getElementById('ADMnameATT').value = data.name;
    const ADMcpf = document.getElementById('ADMcpfATT').value = data.cpf;
    const ADMage = document.getElementById('ADMageATT').value = data.age;


    axios.put(`https://growdev-api-transactions.herokuapp.com/users/${data.id}`, {name: ADMname, email: ADMemail, cpf: ADMcpf, age: ADMage});
}

async function excluirUsuario(indice){
    const data = await axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        return (response.data.data);
    });

    const objetoSelected = data[indice];

    axios.delete(`https://growdev-api-transactions.herokuapp.com/users/${objetoSelected.id}`)
}

function ModalAtualizarDadosUsuario() {
    var myModal = new bootstrap.Modal(document.getElementById('ADMModificarNovoUsuario'), {});
    myModal.show();
}

function AbrirModalParaSelecionarUsuario() {
    var myModal = new bootstrap.Modal(document.getElementById('modalOnloadTranfer'), {});
    myModal.show();
}

async function BuscarTranferenciasDoUsuario(){
    const UserID = document.getElementById('ADMid').value;
    const dados = document.getElementById('tableBodyTranferencias');
    const totais = document.getElementById('tableFooterTranferencias');

    const transactions = await axios.get(`https://growdev-api-transactions.herokuapp.com/users/${UserID}/transactions`).then((response) => response.data)

    let i = 1;
    (transactions.transaction).forEach((transf) => {
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

function LogoutADMpage(){
    AbrirEmOutraURL('index.html')
}

