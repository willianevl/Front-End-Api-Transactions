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

    const CPFJáExiste = InformaçõesDosUsuarios.find((f) => {
        return f.cpf === cpf
    });

    if(CPFJáExiste){
        return mostrarModalCPFJáExiste();
    }

    NewUser.catch(() => mostrarModalDeErroAoCriarusuario());
    NewUser.then(() =>  mostrarModalSuccess());
};

function mostrarModalCPFJáExiste(){
    var myModal = new bootstrap.Modal(document.getElementById('modalErrorCPFJáExiste'), {});
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
window.addEventListener('load', () => {
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
})


document.getElementById('logoutUserPage').addEventListener('click', () => {

});

function ImprimirDadosDoUsuárioEmTabela(data){
    const dados = document.getElementById('tableBody');
    
    let i = 1;
    let newContent = "";
    data.forEach((user) => {
        newContent += `
            <tr>
                <td>${i}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.cpf}</td>
                <td><button class='table-btn-editar'>Editar</button></td>
                <td><button class='table-btn-excluir'>Excluir</button></td>
            </tr>
        `;
        i++
    });

    dados.innerHTML = newContent;
}

function AdmCriaUmNovoUsuário(){
    console.log('willian')
}



