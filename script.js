document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php",
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuarios => inserirUsuarios(usuarios))
        .catch(error => console.log(error));
}

function inserirUsuarios(usuarios) {
    for (const usuario of usuarios) {
        inserirUsuario(usuario);
    }
}

function inserirUsuario(usuario) {
    let tbody = document.getElementById('usuarios');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = usuario.id_usuario;
    let tdNome = document.createElement('td');
    tdNome.innerHTML = usuario.nome;
    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = usuario.email;
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaUsuario, false);
    btnAlterar.id_usuario = usuario.id_usuario;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_usuario = usuario.id_usuario;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_usuario = evt.currentTarget.id_usuario;
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?");
    if (excluir == true) {
        fetch('excluir.php?id_usuario=' + id_usuario,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirUsuario(retorno, id_usuario))
            .catch(error => console.log(error));
    }
}

function excluirUsuario(retorno, id_usuario) {
    if (retorno == true) {
        let tbody = document.getElementById('usuarios');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_usuario) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarUsuario(usuario) {
    let tbody = document.getElementById('usuarios');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == usuario.id_usuario) {
            tr.children[1].innerHTML = usuario.nome;
            tr.children[2].innerHTML = usuario.email;
        }
    }
}

function buscaUsuario(evt) {
    let id_usuario = evt.currentTarget.id_usuario;
    fetch('buscaUsuario.php?id_usuario=' + id_usuario,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => preencheForm(usuario))
        .catch(error => console.log(error));
}

function preencheForm(usuario) {
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    inputIDUsuario.value = usuario.id_usuario;
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = usuario.nome
    let inputEmail = document.getElementsByName("email")[0];
    inputEmail.value = usuario.email;
}

function salvarUsuario(event) {
    // parar o comportamento padrão do form
    event.preventDefault();
    // obtém o input id_usuario
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    // pega o valor do input id_usuario
    let id_usuario = inputIDUsuario.value;

    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputEmail = document.getElementsByName("email")[0];
    let email = inputEmail.value;
    let inputSenha = document.getElementsByName("senha")[0];
    let senha = inputSenha.value;

    if (id_usuario == "") {
        cadastrar(id_usuario, nome, email, senha);
    } else {
        alterar(id_usuario, nome, email, senha);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(id_usuario, nome, email, senha) {
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_usuario: id_usuario,
                nome: nome,
                email: email,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => inserirUsuario(usuario))
        .catch(error => console.log(error));
}

function alterar(id_usuario, nome, email, senha) {
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_usuario: id_usuario,
                nome: nome,
                email: email,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => alterarUsuario(usuario))
        .catch(error => console.log(error));
}