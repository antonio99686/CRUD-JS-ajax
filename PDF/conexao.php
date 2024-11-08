<?php
function conectar()
{
    $conexao = mysqli_connect("localhost", "root", "", "sentinelas");
    if ($conexao === false) {
        echo "Erro ao conectar á base dados.N° do erro" .
            mysqli_connect_errno() . "." .
            mysqli_connect_error();
        exit;
    }
    return $conexao;
}



?>