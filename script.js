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
        .then(carro => inserircarro(carro))
        .catch(error => console.log(error));
}

function inserircarro(carro) {
    for (const usuario of carro) {
        inserirUsuario(usuario);
    }
}

function inserirUsuario(usuario) {
    let tbody = document.getElementById('carro');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = usuario.id_carro;
    let tdmodelo = document.createElement('td');
    tdmodelo.innerHTML = usuario.modelo;
    let tdmarca = document.createElement('td');
    tdmarca.innerHTML = usuario.marca;
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaUsuario, false);
    btnAlterar.id_carro = usuario.id_carro;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_carro = usuario.id_carro;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdmodelo);
    tr.appendChild(tdmarca);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_carro = evt.currentTarget.id_carro;
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?");
    if (excluir == true) {
        fetch('excluir.php?id_carro=' + id_carro,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirUsuario(retorno, id_carro))
            .catch(error => console.log(error));
    }
}

function excluirUsuario(retorno, id_carro) {
    if (retorno == true) {
        let tbody = document.getElementById('carro');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_carro) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarUsuario(usuario) {
    let tbody = document.getElementById('carro');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == usuario.id_carro) {
            tr.children[1].innerHTML = usuario.modelo;
            tr.children[2].innerHTML = usuario.marca;
        }
    }
}

function buscaUsuario(evt) {
    let id_carro = evt.currentTarget.id_carro;
    fetch('buscaUsuario.php?id_carro=' + id_carro,
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
    let inputIDUsuario = document.getElementsByName("id_carro")[0];
    inputIDUsuario.value = usuario.id_carro;
    let inputmodelo = document.getElementsByName("modelo")[0];
    inputmodelo.value = usuario.modelo
    let inputmarca = document.getElementsByName("marca")[0];
    inputmarca.value = usuario.marca;
}

function salvarUsuario(event) {
    // parar o comportamento padrão do form
    event.preventDefault();
    // obtém o input id_carro
    let inputIDUsuario = document.getElementsByName("id_carro")[0];
    // pega o valor do input id_carro
    let id_carro = inputIDUsuario.value;

    let inputmodelo = document.getElementsByName("modelo")[0];
    let modelo = inputmodelo.value;
    let inputmarca = document.getElementsByName("marca")[0];
    let marca = inputmarca.value;
    let inputSenha = document.getElementsByName("senha")[0];
    let senha = inputSenha.value;

    if (id_carro == "") {
        cadastrar(id_carro, modelo, marca, senha);
    } else {
        alterar(id_carro, modelo, marca, senha);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(id_carro, modelo, marca, senha) {
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_carro: id_carro,
                modelo: modelo,
                marca: marca,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => inserirUsuario(usuario))
        .catch(error => console.log(error));
}

function alterar(id_carro, modelo, marca, senha) {
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_carro: id_carro,
                modelo: modelo,
                marca: marca,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => alterarUsuario(usuario))
        .catch(error => console.log(error));
}