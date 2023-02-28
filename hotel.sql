-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-02-2023 a las 02:38:42
-- Versión del servidor: 5.7.40
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hotel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
CREATE TABLE IF NOT EXISTS `habitacion` (
  `idhab` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `habitacion_piso` int(2) NOT NULL,
  `habitacion_num` int(2) NOT NULL,
  `cant_camas` int(1) NOT NULL,
  `tv` tinyint(1) NOT NULL,
  `frigobar` tinyint(1) NOT NULL,
  PRIMARY KEY (`idhab`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`idhab`, `habitacion_piso`, `habitacion_num`, `cant_camas`, `tv`, `frigobar`) VALUES
(1, 1, 2, 1, 1, 0),
(3, 5, 10, 2, 0, 1),
(4, 2, 6, 4, 1, 1),
(5, 1, 20, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE IF NOT EXISTS `persona` (
  `id_persona` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(100) COLLATE utf8_bin NOT NULL,
  `cedula` int(11) NOT NULL,
  `correo` varchar(150) COLLATE utf8_bin NOT NULL,
  `telefono` int(12) NOT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `nombre_completo`, `cedula`, `correo`, `telefono`) VALUES
(1, 'Ana B de Arco', 2345, 'ana@htmail.com', 12349944),
(3, 'Rene Torres', 34567, 'rene@htmail.com', 2355657);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

DROP TABLE IF EXISTS `reserva`;
CREATE TABLE IF NOT EXISTS `reserva` (
  `idreserva` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fechareserva` varchar(10) COLLATE utf8_bin NOT NULL,
  `fechaentrada` varchar(10) COLLATE utf8_bin NOT NULL,
  `fechasalida` varchar(10) COLLATE utf8_bin NOT NULL,
  `montoreserva` int(11) NOT NULL,
  `idhabitacion` int(10) UNSIGNED NOT NULL,
  `idpersona` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`idreserva`),
  KEY `fk_habitacion_reserva` (`idhabitacion`),
  KEY `fk_persona_reserva` (`idpersona`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`idreserva`, `fechareserva`, `fechaentrada`, `fechasalida`, `montoreserva`, `idhabitacion`, `idpersona`) VALUES
(1, '2023/01/26', '2023/02/21', '2023/02/30', 1080000, 1, 3);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_habitacion_reserva` FOREIGN KEY (`idhabitacion`) REFERENCES `habitacion` (`idhab`),
  ADD CONSTRAINT `fk_persona_reserva` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`id_persona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
