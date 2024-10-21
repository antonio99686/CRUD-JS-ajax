<?php

require_once "conexao.php";
$conexao = conectar();

$carro = json_decode(file_get_contents("php://input"));
$sql = "UPDATE carros SET
        nome='$carro->nome', 
        email='$carro->email', 
        senha='$carro->senha'
        WHERE id_carro=$carro->id_carro";

executarSQL($conexao, $sql);

echo json_encode($usuario);
