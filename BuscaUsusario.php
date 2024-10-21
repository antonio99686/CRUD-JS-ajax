<?php

$id_carro = $_GET['id$id_carro'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_carro, modelo, marca,ano,preco FROM carros 
        WHERE id_carro = $id_carro";
$resultado = executarSQL($conexao, $sql);
$usuario = mysqli_fetch_assoc($resultado);
echo json_encode($usuario);
