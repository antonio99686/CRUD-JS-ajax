<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navbar com Carrossel Automático e Box-Shadow</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <style>
    /* Estilo personalizado para a navbar */
    .navbar-custom {
      background-color: #343a40; /* Cor de fundo da navbar */
    }
    /* Estilo para os elementos com box-shadow */
    .box-shadow {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra personalizada */
    }
  </style>
</head>
<body>
  
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
    <a class="navbar-brand" href="#">Meu Site</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Sobre</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Serviços</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contato</a>
        </li>
      </ul>
    </div>
  </nav>
  
  <!-- Carrossel -->
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="https://via.placeholder.com/800x300?text=Primeiro+Slide" alt="Primeiro Slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="https://via.placeholder.com/800x300?text=Segundo+Slide" alt="Segundo Slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="https://via.placeholder.com/800x300?text=Terceiro+Slide" alt="Terceiro Slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Anterior</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Próximo</span>
    </a>
  </div>
  
  <!-- Elementos com box-shadow -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 box-shadow">
        <h2>Box-Shadow 1</h2>
        <p>Conteúdo do primeiro elemento com sombra.</p>
      </div>
      <div class="col-md-6 box-shadow">
        <h2>Box-Shadow 2</h2>
        <p>Conteúdo do segundo elemento com sombra.</p>
      </div>
    </div>
  </div>
  
  <!-- Bootstrap JS e dependências -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  
  <!-- Script para carrossel automático -->
  <script>
    $(document).ready(function(){
      $('#carouselExampleIndicators').carousel({
        interval: 3000 // Tempo em milissegundos (3 segundos)
      });
    });
  </script>
</body>
</html>
