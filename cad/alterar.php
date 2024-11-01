<?php

require_once "conexao.php";
$conexao = conectar();

$carro = json_decode(file_get_contents("php://input"));
$sql = "UPDATE carros SET
        modelo='$carro->modelo', 
        marca='$carro->marca', 
        ano='$carro->ano',
        preco='$carro->preco'
        WHERE id_veiculo=$carro->id_veiculo";

executarSQL($conexao, $sql);

echo json_encode($carro);
