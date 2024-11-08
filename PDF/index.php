<?php
// Verifica se o ID do usuário foi fornecido na URL e se é um número válido
if (isset($_GET['id_usuario']) && is_numeric($_GET['id_usuario'])) {
    $id_usuario = $_GET['id_usuario'];
} else {
    // Se o ID do usuário não estiver presente ou não for válido, exibe uma mensagem de erro e interrompe o script

    die('ID do usuário não fornecido ou inválido.');
}

// Inclui o arquivo de conexão com o banco de dados
require_once "conexao.php";
$conexao = conectar();

// Cria a consulta SQL para selecionar os dados do usuário com o ID especificado
$sql = "SELECT * FROM usuario WHERE id_usuario = $id_usuario";
// Executa a consulta SQL
$result = $conexao->query($sql);

// Verifica se a consulta retornou resultados
if ($result->num_rows > 0) {

    // Inicia a construção do HTML para o PDF, incluindo os estilos CSS
    $html = "
    <!DOCTYPE html>
    <html lang='pt-br'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='stylesheet' href='http://localhost/tcc/pdf/css/pdf.css'>
        <link rel='stylesheet' href='css/pdf.css'>
        <title>Sentinela da Fronteira</title>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='http://localhost/tcc/pdf/img/logo.jpg' alt='Logo'>
                <h2>Sentinela da Fronteira</h2>
            </div>";

    // Loop para percorrer os resultados da consulta
    while ($dados = $result->fetch_assoc()) {
        // Adiciona os detalhes do usuário ao HTML do PDF
        $data_entrada = date("d/m/Y", strtotime($dados['data_entrada']));
        $datas = date("d/m/Y", strtotime($dados['datas']));

        $html .= "
            <div class='info'>
            
                <h3>Detalhes do Usuário</h3>
                <p><strong>Nome:</strong> " . $dados['nome'] . "</p>
                <p><strong>Email:</strong> " . $dados['email'] . "</p>
                <p><strong>Telefone:</strong> " . $dados['telefone'] . "</p>
                <p><strong>Data de Nascimento:</strong> " . $datas . "</p>
                <p><strong>CPF:</strong> " . $dados['CPF'] . "</p>
                <p><strong>RG:</strong> " . $dados['RG'] . "</p>
                <p><strong>Sexo:</strong> " . $dados['genero'] . "</p>
                <p><strong>Idade:</strong> " . $dados['idade'] . "</p>
                <p><strong>Data de Entrada:</strong> " . $data_entrada . "</p>
                <p><strong>Responsável:</strong> " . $dados['responsavel'] . "</p>
            </div>
            
        <div class='cart_ident'>
   
        <img class='frente' src='http://localhost/tcc/img/carteira/" . $dados['identidade_frente'] . "'>
        <img class='verso' src='http://localhost/tcc/img/carteira/" . $dados['identidade_verso'] . "'>
            
        </div>
            ";
    }

    // Adiciona o footer com as informações de email e data
    $html .= "
            <div class='footer'>
                <p>Email: sentineladafronteira@gmail.com</p>
                <p>Data: " . date('d/m/Y') . "</p>
            </div>
        </div>
    </body>
    </html>";

} else {
    // Caso não haja resultados, exibe uma mensagem
    $html = 'Nenhum dado registrado para o ID de usuário fornecido.';
}

// Carrega a biblioteca Dompdf
use Dompdf\Dompdf;

require_once 'dompdf/autoload.inc.php';

// Inicializa o objeto Dompdf
$PDF = new Dompdf(['enable_remote' => true]);

// Carrega o HTML gerado para o PDF
$PDF->loadHtml($html);

// Define o tamanho e a orientação do papel
$PDF->setPaper('A4', 'portrait');

// Renderiza o PDF
$PDF->render();

// Exibe o PDF no navegador
$PDF->stream();
?>