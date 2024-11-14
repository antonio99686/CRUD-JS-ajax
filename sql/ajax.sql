-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 14-Nov-2024 às 19:47
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ajax`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `carros`
--

DROP TABLE IF EXISTS `carros`;
CREATE TABLE IF NOT EXISTS `carros` (
  `id_veiculo` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `marca` varchar(255) NOT NULL,
  `ano` date NOT NULL,
  `preco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_veiculo`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `carros`
--

INSERT INTO `carros` (`id_veiculo`, `modelo`, `marca`, `ano`, `preco`) VALUES
(14, 'Santa Fe', 'Hyundai', '0000-00-00', '180000'),
(13, 'Fusion', 'Ford', '0000-00-00', '130000'),
(12, 'HB20', 'Hyundai', '0000-00-00', '60000'),
(11, 'Corolla', 'Toyota', '0000-00-00', '115000'),
(2, 'Civic', 'Honda', '0000-00-00', '95000'),
(3, 'Focus', 'Ford', '0000-00-00', '80000'),
(4, 'Onix', 'Chevrolet', '0000-00-00', '70000'),
(5, 'Gol', 'Volkswagen', '0000-00-00', '65000'),
(10, 'Kick', 'Nissan', '5555-05-22', '85000'),
(9, 'Celerio', 'Suzuki', '0000-00-00', '55000'),
(8, '3', 'BMW', '0000-00-00', '120000'),
(7, 'A4', 'Audi', '0000-00-00', '150000'),
(6, 'Fusca', 'Volkswagen', '0000-00-00', '30000'),
(16, 'Civic', 'Honda', '0000-00-00', '105000'),
(17, 'Compass', 'Jeep', '0000-00-00', '140000'),
(18, 'Tucson', 'Hyundai', '0000-00-00', '160000'),
(19, 'Renegade', 'Jeep', '0000-00-00', '90000'),
(20, 'Kona', 'Hyundai', '0000-00-00', '110000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
