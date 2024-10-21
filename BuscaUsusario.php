<?php

$id_usuario = $_GET['id_usuario'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_usuario, nome, email FROM usuario 
        WHERE id_usuario = $id_usuario";
$resultado = executarSQL($conexao, $sql);
$usuario = mysqli_fetch_assoc($resultado);
echo json_encode($usuario);
