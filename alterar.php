<?php

require_once "conexao.php";
$conexao = conectar();

$usuario = json_decode(file_get_contents("php://input"));
$sql = "UPDATE usuario SET
        nome='$usuario->nome', 
        email='$usuario->email', 
        senha='$usuario->senha'
        WHERE id_usuario=$usuario->id_usuario";

executarSQL($conexao, $sql);

echo json_encode($usuario);
