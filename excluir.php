<?php

$id_usuario = $_GET['id_usuario'];

require_once "conexao.php";
$conexao = conectar();
$sql = "DELETE FROM usuario WHERE id_usuario = $id_usuario";
$retorno = executarSQL($conexao, $sql);
echo json_encode($retorno);