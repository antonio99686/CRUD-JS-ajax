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
    for (const carro of carro) {
        inserircarro(carro);
    }
}

function inserircarro(carro) {
    let tbody = document.getElementById('carro');
    let tr = document.createElement('tr');
    
    let tdId = document.createElement('td');
    tdId.innerHTML = carro.id_carro;
    
    let tdModelo = document.createElement('td');
    tdModelo.innerHTML = carro.modelo;
    
    let tdMarca = document.createElement('td');
    tdMarca.innerHTML = carro.marca;
    
    let tdAno = document.createElement('td');
    tdAno.innerHTML = carro.ano; // Added ano
    
    let tdPreco = document.createElement('td');
    tdPreco.innerHTML = carro.preco; // Added preco
    
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscacarro, false);
    btnAlterar.id_carro = carro.id_carro;
    tdAlterar.appendChild(btnAlterar);
    
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_carro = carro.id_carro;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    
    tr.appendChild(tdId);
    tr.appendChild(tdModelo);
    tr.appendChild(tdMarca);
    tr.appendChild(tdAno); // Append ano
    tr.appendChild(tdPreco); // Append preco
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
            .then(retorno => excluircarro(retorno, id_carro))
            .catch(error => console.log(error));
    }
}

function excluircarro(retorno, id_carro) {
    if (retorno == true) {
        let tbody = document.getElementById('carro');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_carro) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarcarro(carro) {
    let tbody = document.getElementById('carro');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == carro.id_carro) {
            tr.children[1].innerHTML = carro.modelo;
            tr.children[2].innerHTML = carro.marca;
            tr.children[3].innerHTML = carro.ano;   // Update ano
            tr.children[4].innerHTML = carro.preco; // Update preco
        }
    }
}


function buscacarro(evt) {
    let id_carro = evt.currentTarget.id_carro;
    fetch('buscacarro.php?id_carro=' + id_carro,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(carro => preencheForm(carro))
        .catch(error => console.log(error));
}

function preencheForm(carro) {
    let inputIDcarro = document.getElementsByName("id_carro")[0];
    inputIDcarro.value = carro.id_carro;
    
    let inputModelo = document.getElementsByName("modelo")[0];
    inputModelo.value = carro.modelo;
    
    let inputMarca = document.getElementsByName("marca")[0];
    inputMarca.value = carro.marca;
    
    let inputAno = document.getElementsByName("ano")[0]; // Added ano input
    inputAno.value = carro.ano;
    
    let inputPreco = document.getElementsByName("preco")[0]; // Added preco input
    inputPreco.value = carro.preco;
}


function salvarcarro(event) {
    event.preventDefault();
    
    let inputIDcarro = document.getElementsByName("id_carro")[0];
    let id_carro = inputIDcarro.value;

    let inputModelo = document.getElementsByName("modelo")[0];
    let modelo = inputModelo.value;

    let inputMarca = document.getElementsByName("marca")[0];
    let marca = inputMarca.value;

    let inputAno = document.getElementsByName("ano")[0]; // Added ano input
    let ano = inputAno.value;

    let inputPreco = document.getElementsByName("preco")[0]; // Added preco input
    let preco = inputPreco.value;

    let inputSenha = document.getElementsByName("senha")[0];
    let senha = inputSenha.value;

    if (id_carro == "") {
        cadastrar(id_carro, modelo, marca, ano, preco, senha);
    } else {
        alterar(id_carro, modelo, marca, ano, preco, senha);
    }
    document.getElementsByTagName('form')[0].reset();
}



function cadastrar(id_carro, modelo, marca, ano, preco, senha) {
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_carro: id_carro,
                modelo: modelo,
                marca: marca,
                ano: ano,       // Added ano
                preco: preco,   // Added preco
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    .then(response => response.json())
    .then(carro => inserircarro(carro))
    .catch(error => console.log(error));
}

function alterar(id_carro, modelo, marca, ano, preco, senha) {
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_carro: id_carro,
                modelo: modelo,
                marca: marca,
                ano: ano,       // Added ano
                preco: preco,   // Added preco
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    .then(response => response.json())
    .then(carro => alterarcarro(carro))
    .catch(error => console.log(error));
}
