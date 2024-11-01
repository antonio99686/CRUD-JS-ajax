document.addEventListener("DOMContentLoaded", () => {
  listarTodos();
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals); // Inicializa todos os modais no documento
});

let idVeiculoParaExcluir = null;

function listarTodos() {
  fetch("listar.php", {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((veiculos) => inserirVeiculos(veiculos))
    .catch((error) => console.log(error));
}

function inserirVeiculos(veiculos) {
  for (const veiculo of veiculos) {
    inserirVeiculo(veiculo);
  }
}

function inserirVeiculo(veiculo) {
  let tbody = document.getElementById("veiculos");
  let tr = document.createElement("tr");
  let tdId = document.createElement("td");
  tdId.innerHTML = veiculo.id_veiculo;
  let tdMarca = document.createElement("td");
  tdMarca.innerHTML = veiculo.marca;
  let tdModelo = document.createElement("td");
  tdModelo.innerHTML = veiculo.modelo;
  let tdAno = document.createElement("td");
  tdAno.innerHTML = veiculo.ano;
  let tdPreco = document.createElement("td");
  tdPreco.innerHTML = veiculo.preco;

  let tdAlterar = document.createElement("td");
  let btnAlterar = document.createElement("button");
  btnAlterar.innerHTML = "Alterar";
  btnAlterar.className = "btn blue";
  btnAlterar.addEventListener("click", buscaVeiculo, false);
  btnAlterar.id_veiculo = veiculo.id_veiculo;
  tdAlterar.appendChild(btnAlterar);

  let tdExcluir = document.createElement("td");
  let btnExcluir = document.createElement("button");
  btnExcluir.innerHTML = "Excluir";
  btnExcluir.className = "btn red";
  btnExcluir.addEventListener(
    "click",
    () => abrirModalExcluir(veiculo.id_veiculo),
    false
  );
  tdExcluir.appendChild(btnExcluir);

  tr.appendChild(tdId);
  tr.appendChild(tdMarca);
  tr.appendChild(tdModelo);
  tr.appendChild(tdAno);
  tr.appendChild(tdPreco);
  tr.appendChild(tdAlterar);
  tr.appendChild(tdExcluir);
  tbody.appendChild(tr);
}

function abrirModalExcluir(id_veiculo) {
  idVeiculoParaExcluir = id_veiculo;
  let modalExcluir = M.Modal.getInstance(
    document.getElementById("modalExcluir")
  );
  modalExcluir.open();
}

document.getElementById("confirmarExcluir").addEventListener("click", () => {
  if (idVeiculoParaExcluir !== null) {
    excluirVeiculo(idVeiculoParaExcluir);
    idVeiculoParaExcluir = null; // Reseta o ID após a exclusão
  }
});

function excluirVeiculo(id_veiculo) {
  fetch(`excluir.php?id_veiculo=${id_veiculo}`, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((retorno) => {
      if (retorno) {
        let tbody = document.getElementById("veiculos");
        for (const tr of tbody.children) {
          if (tr.children[0].innerHTML == id_veiculo) {
            tbody.removeChild(tr);
            break;
          }
        }
      }
    })
    .catch((error) => console.log(error));
      // Após a exclusão, exibe o toast de exclusão com sucesso
      M.toast({html: 'Veículo excluído com sucesso!', classes: 'red', displayLength: 4000});
      
}

function alterarVeiculo(veiculo) {
  let tbody = document.getElementById("veiculos");
  for (const tr of tbody.children) {
    if (tr.children[0].innerHTML == veiculo.id_veiculo) {
      tr.children[1].innerHTML = veiculo.marca;
      tr.children[2].innerHTML = veiculo.modelo;
      tr.children[3].innerHTML = veiculo.ano;
      tr.children[4].innerHTML = veiculo.preco;
    }
  }
}

function buscaVeiculo(evt) {
  let id_veiculo = evt.currentTarget.id_veiculo;
  fetch("buscaVeiculo.php?id_veiculo=" + id_veiculo, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((veiculo) => preencheForm(veiculo))
    .catch((error) => console.log(error));
}
function preencheForm(veiculo) {
  document.getElementById("id_veiculo").value = veiculo.id_veiculo;
  document.getElementById("marca").value = veiculo.marca;
  document.getElementById("modelo").value = veiculo.modelo;
  document.getElementById("ano").value = veiculo.ano;
  document.getElementById("preco").value = veiculo.preco;

  // Update the labels
  M.updateTextFields();

  // Open the modal
  var elem = document.querySelector("#editModal");
  var instance = M.Modal.getInstance(elem);
  instance.open();
}

function salvarVeiculo(event) {
  event.preventDefault();
  let id_veiculo = document.getElementsByName("id_veiculo")[0].value;
  let marca = document.getElementsByName("marca")[0].value;
  let modelo = document.getElementsByName("modelo")[0].value;
  let ano = document.getElementsByName("ano")[0].value;
  let preco = document.getElementsByName("preco")[0].value;

  if (id_veiculo === "") {
    cadastrar(marca, modelo, ano, preco);
  } else {
    alterar(id_veiculo, marca, modelo, ano, preco);
  }
  // Após salvar, exibe o toast de sucesso
  M.toast({ html: "Veículo cadastrado com sucesso!", classes: "green" });
  document.getElementsByTagName("form")[0].reset();
}

function cadastrar(marca, modelo, ano, preco) {
  fetch("inserir.php", {
    method: "POST",
    body: JSON.stringify({
      marca: marca,
      modelo: modelo,
      ano: ano,
      preco: preco,
    }),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((veiculo) => inserirVeiculo(veiculo))
    .catch((error) => console.log(error));
}

function alterar(id_veiculo, marca, modelo, ano, preco) {
  fetch("alterar.php", {
    method: "POST",
    body: JSON.stringify({
      id_veiculo: id_veiculo,
      marca: marca,
      modelo: modelo,
      ano: ano,
      preco: preco,
    }),
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((veiculo) => alterarVeiculo(veiculo))
    .catch((error) => console.log(error));
}
