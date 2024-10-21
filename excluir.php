<?php

$id_carro = $_GET['id_carro'];

require_once "conexao.php";
$conexao = conectar();
$sql = "DELETE FROM carros WHERE id_carro = $id_carro";
$retorno = executarSQL($conexao, $sql);
echo json_encode($retorno);