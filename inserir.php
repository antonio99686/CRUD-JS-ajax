<?php

require_once "conexao.php";
$conexao = conectar();

$carro = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO carros 
        (modelo, marca, ano, preco)
        VALUES 
        ('$carro->modelo', 
        '$carro->marca', 
        '$carro->ano',
        '$carro->preco')";

executarSQL($conexao, $sql);

$carro->id_carro = mysqli_insert_id($conexao);
echo json_encode($carro);
