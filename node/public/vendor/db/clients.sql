-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2022 at 01:21 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clients`
--

-- --------------------------------------------------------

--
-- Table structure for table `CURRENT_ACCOUNT`
--

CREATE TABLE `CURRENT_ACCOUNT` (
  `DNI` varchar(9) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `ACCOUNT_TYPE` varchar(50) NOT NULL,
  `AMOUNT` decimal(12,2) NOT NULL,
  `CLIENT_TYPE` varchar(20) NOT NULL,
  `ENTRY_DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `CURRENT_ACCOUNT`
--

INSERT INTO `CURRENT_ACCOUNT` (`DNI`, `NAME`, `ACCOUNT_TYPE`, `AMOUNT`, `CLIENT_TYPE`, `ENTRY_DATE`) VALUES
('03979213Y', 'Mauricio Luengo', 'Solidary account', '148293.00', 'Very rich client', '2018-09-24'),
('16161348F', 'Aleix Gordillo', 'Solidary account', '100029.00', 'Very rich client', '2018-01-22'),
('23743498T', 'Maximo Maroto', 'Personal account', '54167.00', 'Normal client', '2018-01-30'),
('31422986H', 'Martin Moya', 'Tax-Free Savings Account', '118301.21', 'Very rich client', '2018-04-21'),
('40674703P', 'Antonio Soler', 'Fixed deposit account', '126207.00', 'Very rich client', '2018-03-15'),
('48871959H', 'Francesc Vela', 'Individual Savings Account', '15000.00', 'Normal client', '2018-09-02'),
('56249001V', 'Anselmo Bejarano', 'Tax-Free Savings Account', '120652.00', 'Very rich client', '2018-10-24'),
('60076965E', 'Jorge Ventura', 'Investement account', '1039.00', 'Poor client', '2018-01-05'),
('63080540G', 'Luis Fernando', 'Savings account', '83238.00', 'Normal client', '2018-05-03'),
('88631575V', 'Enric Brito', 'Investement account', '2030.90', 'Poor client', '2017-11-24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CURRENT_ACCOUNT`
--
ALTER TABLE `CURRENT_ACCOUNT`
  ADD PRIMARY KEY (`DNI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
