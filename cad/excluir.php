<?php

$id_veiculo = $_GET['id_veiculo'];

require_once "conexao.php";
$conexao = conectar();
$sql = "DELETE FROM carros WHERE id_veiculo = $id_veiculo";
$retorno = executarSQL($conexao, $sql);
echo json_encode($retorno);