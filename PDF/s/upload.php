<?php
require 'vendor/autoload.php';

use thiagoalessio\TesseractOCR\TesseractOCR;

if (isset($_POST['submit'])) {
    $target_dir = "img/";
    $target_file = $target_dir . basename($_FILES["rg_image"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verifica se o arquivo é uma imagem real
    $check = getimagesize($_FILES["rg_image"]["tmp_name"]);
    if ($check !== false) {
        if (move_uploaded_file($_FILES["rg_image"]["tmp_name"], $target_file)) {
            echo "O arquivo " . htmlspecialchars(basename($_FILES["rg_image"]["name"])) . " foi enviado com sucesso.";
            // Chame a função OCR aqui
            performOCR($target_file);
        } else {
            echo "Desculpe, houve um erro ao enviar seu arquivo.";
        }
    } else {
        echo "O arquivo não é uma imagem.";
    }
}

function performOCR($imagePath) {
    $text = (new TesseractOCR($imagePath))->run();
    echo "<pre>$text</pre>";
}
?>
