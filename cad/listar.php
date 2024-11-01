<?php

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT * FROM carros";
$resultado = executarSQL($conexao, $sql);
$carros = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
echo json_encode($carros);
