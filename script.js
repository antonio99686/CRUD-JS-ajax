document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php", {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carros => carros.forEach(carro => inserirCarro(carro)))  // Corrigido
    .catch(error => console.log(error));
}

function inserirCarro(carro) {  // Função renomeada para evitar duplicação
    let tbody = document.getElementById('carro');
    let tr = document.createElement('tr');
    
    let tdId = document.createElement('td');
    tdId.innerHTML = carro.id_carro;
    
    let tdModelo = document.createElement('td');
    tdModelo.innerHTML = carro.modelo;
    
    let tdMarca = document.createElement('td');
    tdMarca.innerHTML = carro.marca;
    
    let tdAno = document.createElement('td');
    tdAno.innerHTML = carro.ano;
    
    let tdPreco = document.createElement('td');
    tdPreco.innerHTML = carro.preco;
    
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscacarro, false);
    btnAlterar.dataset.idCarro = carro.id_carro;
    tdAlterar.appendChild(btnAlterar);
    
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = "Excluir";
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.dataset.idCarro = carro.id_carro;
    tdExcluir.appendChild(btnExcluir);
    
    tr.appendChild(tdId);
    tr.appendChild(tdModelo);
    tr.appendChild(tdMarca);
    tr.appendChild(tdAno);
    tr.appendChild(tdPreco);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_carro = evt.currentTarget.dataset.idCarro;
    let excluir = confirm("Você tem certeza que deseja excluir este carro?");
    if (excluir) {
        fetch('excluir.php?id_carro=' + id_carro, {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(retorno => {
            if (retorno) {
                let tbody = document.getElementById('carro');
                for (const tr of tbody.children) {
                    if (tr.children[0].innerHTML == id_carro) {
                        tbody.removeChild(tr);
                        break;
                    }
                }
            }
        })
        .catch(error => console.log(error));
    }
}

function buscacarro(evt) {
    let id_carro = evt.currentTarget.dataset.idCarro;
    fetch('buscacarro.php?id_carro=' + id_carro, {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => preencheForm(carro))
    .catch(error => console.log(error));
}

function preencheForm(carro) {
    document.getElementsByName("id_carro")[0].value = carro.id_carro;
    document.getElementsByName("modelo")[0].value = carro.modelo;
    document.getElementsByName("marca")[0].value = carro.marca;
    document.getElementsByName("ano")[0].value = carro.ano;
    document.getElementsByName("preco")[0].value = carro.preco;
}

function salvarcarro(event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    
    let id_carro = document.getElementsByName("id_carro")[0].value;
    let modelo = document.getElementsByName("modelo")[0].value;
    let marca = document.getElementsByName("marca")[0].value;
    let ano = document.getElementsByName("ano")[0].value;
    let preco = document.getElementsByName("preco")[0].value;

    // Verifica se é para cadastrar ou alterar
    if (!id_carro) {
        cadastrar(modelo, marca, ano, preco);
    } else {
        alterar(id_carro, modelo, marca, ano, preco);
    }
    
    // Limpa o formulário
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(modelo, marca, ano, preco) {
    fetch('inserir.php', {
        method: 'POST',
        body: JSON.stringify({
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco
        }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(carro => {
        console.log(carro);
        inserircarro(carro); // Função para inserir o carro na tabela
    })
    .catch(error => console.error('Erro ao cadastrar o carro:', error));
}

function alterar(id_carro, modelo, marca, ano, preco) {
    fetch('alterar.php', {
        method: 'POST',
        body: JSON.stringify({
            id_carro: id_carro,
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco
        }),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(carro => {
        console.log(carro);
        alterarcarro(carro); // Função para atualizar a linha da tabela
    })
    .catch(error => console.error('Erro ao alterar o carro:', error));
}


function cadastrar(modelo, marca, ano, preco) {
    fetch('inserir.php', {
        method: 'POST',
        body: JSON.stringify({
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco
        }),
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => inserirCarro(carro))
    .catch(error => console.log(error));
}

function alterar(id_carro, modelo, marca, ano, preco, senha) {
    fetch('alterar.php', {
        method: 'POST',
        body: JSON.stringify({
            id_carro: id_carro,
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco
        }),
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(carro => alterarCarroNaTabela(carro))
    .catch(error => console.log(error));
}

function alterarCarroNaTabela(carro) {
    let tbody = document.getElementById('carro');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == carro.id_carro) {
            tr.children[1].innerHTML = carro.modelo;
            tr.children[2].innerHTML = carro.marca;
            tr.children[3].innerHTML = carro.ano;
            tr.children[4].innerHTML = carro.preco;
        }
    }
}
