<?php

$id_carro = $_GET['id_veiculo'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_veiculo, modelo, marca,ano,preco FROM carros 
        WHERE id_veiculo = $id_carro";
$resultado = executarSQL($conexao, $sql);
$usuario = mysqli_fetch_assoc($resultado);
echo json_encode($usuario);
