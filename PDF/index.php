<?php
// Inclui o arquivo de conexão com o banco de dados
require_once "../cad/conexao.php";
$conexao = conectar();

// Consulta SQL para buscar todos os veículos cadastrados
$sql = "SELECT * FROM carros";
$result = $conexao->query($sql);

// Verifica se há veículos cadastrados
if ($result->num_rows > 0) {

    // Inicia a construção do HTML para o PDF com CSS incorporado
    $html = "
    <!DOCTYPE html>
    <html lang='pt-br'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Relatório de Veículos</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            h2 {
                text-align: center;
                color: #333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            table, th, td {
                border: 1px solid #ccc;
            }
            th, td {
                padding: 8px 12px;
                text-align: left;
            }
            th {
                background-color: #f4f4f4;
                color: #333;
            }
            td {
                color: #555;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            tr:hover {
                background-color: #f1f1f1;
            }
        </style>
    </head>
    <body>
        <h2>Relatório de Veículos Cadastrados</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Preço (R$)</th>
            </tr>";

    // Loop para percorrer os resultados e gerar as linhas da tabela
    while ($dados = $result->fetch_assoc()) {
        // Converte o valor de 'preco' para float
        $preco = number_format(floatval($dados['preco']), 2, ',', '.');
        $html .= "
    <tr>
        <td>" . $dados['id_veiculo'] . "</td>
        <td>" . $dados['marca'] . "</td>
        <td>" . $dados['modelo'] . "</td>
        <td>" . $dados['ano'] . "</td>
        <td>R$ " . $preco . "</td>
    </tr>";
    }

    $html .= "</table></body></html>";
} else {
    // Caso não haja veículos cadastrados
    $html = "<p>Nenhum veículo cadastrado.</p>";
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
$PDF->stream("relatorio_veiculos.pdf");
?>
