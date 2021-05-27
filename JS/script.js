window.addEventListener('load', () => {
    // Todos os elementos do dom e scripts estão disponíveis
    axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        ImprimirDadosDoUsuárioEmTabela(response.data.data);
    });

    axios.get('https://growdev-api-transactions.herokuapp.com/users')
    .then(response => {
        EncontrarID(response.data.data);
    });
});

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

    NewUser.catch(() => mostrarModalDeErroAoCriarusuario());
    NewUser.then(() =>  mostrarModalSuccess());
};

function mostrarUsuarioNãoEncontrado(){
    var myModal = new bootstrap.Modal(document.getElementById('userNotFound'), {});
    myModal.show();
}

function logarComID(){
    const UserID = document.getElementById('UserId').value;

    const logar = axios.get(`https://growdev-api-transactions.herokuapp.com/users/${UserID}`);
    logar.catch(() => mostrarUsuarioNãoEncontrado());
    logar.then(() => AbrirEmOutraURL('usuarioPag.html'))
}


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

function RetornaDadosComoPromessa(){
    return axios.get('https://growdev-api-transactions.herokuapp.com/users');
}


