-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: pkmonkey
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Videojuegos'),(2,'Más que videojuegos'),(3,'Sistemas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'OWNER'),(2,'ADMINISTRATOR'),(3,'USER'),(4,'DELETED');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentslikes`
--

DROP TABLE IF EXISTS `comentslikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentslikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_cl` (`comment`),
  KEY `fk_user_cl` (`user`),
  CONSTRAINT `fk_comment_cl` FOREIGN KEY (`comment`) REFERENCES `comments` (`id`),
  CONSTRAINT `fk_user_cl` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentslikes`
--

LOCK TABLES `comentslikes` WRITE;
/*!40000 ALTER TABLE `comentslikes` DISABLE KEYS */;
INSERT INTO `comentslikes` VALUES (1,2,2),(2,5,152),(3,6,152),(4,2,152),(5,7,152),(6,8,2),(7,7,2),(8,9,2),(9,10,1),(10,9,1),(11,11,1),(12,11,2),(13,7,153),(14,11,153),(15,14,2),(16,1,2);
/*!40000 ALTER TABLE `comentslikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coment` longtext NOT NULL,
  `post` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_post_pc` (`post`),
  KEY `fk_user_pc` (`user`),
  CONSTRAINT `fk_post_pc` FOREIGN KEY (`post`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_user_pc` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Mariiitooooo',1,2,'2022-05-12 19:49:41'),(2,'Yooooo! mi nick es: th3Antonio',9,2,'2022-05-14 13:30:42'),(3,'mi nick es juan32',9,152,'2022-05-14 13:31:04'),(4,'no se que dices?',13,152,'2022-05-14 13:31:19'),(5,'Está en la tienda de Honda',6,152,'2022-05-14 13:31:45'),(6,'Juega en la mesa 3',19,152,'2022-05-14 13:32:01'),(7,'Siii tengo unas ganas',17,152,'2022-05-14 13:32:55'),(8,'Cuando salga me lo compro del tirón',17,152,'2022-05-14 13:33:11'),(9,'Yo ya lo tengo reservado :)',17,2,'2022-05-14 13:33:28'),(10,'yo También lo tengo reservado',17,1,'2022-05-14 13:34:10'),(11,'Cuantos trofeos tendrá?',17,1,'2022-05-14 13:35:26'),(12,'Espero que tenga muchos trofeos.',17,2,'2022-05-14 13:36:06'),(13,'Si espero que tengan muchos trofeos, pk los primeros juegos fueron bastante fáciles de sacar el platino',17,153,'2022-05-14 13:37:11'),(14,'Hay un programa que te lo hace se llama tkstudio',2,153,'2022-05-14 13:39:57'),(15,'oooh funcionaaaa! gracias',2,2,'2022-05-14 13:40:19');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foros`
--

DROP TABLE IF EXISTS `foros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(250) NOT NULL,
  `imageid` varchar(100) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria` (`categoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foros`
--

LOCK TABLES `foros` WRITE;
/*!40000 ALTER TABLE `foros` DISABLE KEYS */;
INSERT INTO `foros` VALUES (1,'OFF Topic y Humor','Hablemos de todo menos de juegos o temas de otros foros.','https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-talk-chat-flatart-icons-solid-flatarticons.png',NULL,'#e69800',2),(2,'Videojuegos en general','Temas sobre juegos en general, Lanzamientos, aztuqalidad, gustos, preguntas...','https://img.icons8.com/glyph-neue/100/000000/controller.png',NULL,'#ed4000',1),(3,'Noticias y actualidad','Tribuna abierta para comentar las noticias del mundo del videojuego.','https://img.icons8.com/ios/100/000000/globe--v1.png',NULL,'#ed4000',1),(4,'PlayStation','Videojuegos, PSN, PSPlus, PlayStation VR y más para los seguidores de consolas Sony','https://img.icons8.com/windows/100/000000/play-station.png',NULL,'#1a5cad',3),(5,'Xbox','Juegos, Xbox Live, Arcade, retrocompatibilidad y todo sobre las consolas Xbox de Microsoft.','https://img.icons8.com/ios-filled/100/000000/xbox.png',NULL,'#50880b',3),(6,'PC / Hardware','Jugadores de PC, Steam, juegos digitales y expertos en configurar equipos y presupuestos.','https://img.icons8.com/ios-filled/100/000000/computer.png',NULL,'#be0b0b',3);
/*!40000 ALTER TABLE `foros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `views` int(11) DEFAULT 0,
  `foro` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_foro` (`foro`),
  KEY `fk_user` (`user`),
  CONSTRAINT `fk_foro` FOREIGN KEY (`foro`) REFERENCES `foros` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'¿Pokémon favorito?','<h1 style=\"font-size: 2.375rem; color: rgb(17, 17, 17); font-family: &quot;Roboto Condensed&quot;, Arial;\"><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;\">Bulbasaur.</pre><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;\"><img src=\"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png\" alt=\"Bulbasaur | Pokédex\"><br></pre><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;\"><br></pre><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;\">Se me ocurrió preguntarlo, a propósito del regalo que le hizo el embajador Japonés al presidente electo de Chile, Gabriel Boric quien asume la presidencia hoy. : )</pre></h1>\n','2022-05-12 19:49:41',4,1,1),(2,'Sonido de PC y PS5 a la vez','<pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;\">Buenas, hago stream con la capturadora interna de elgato 4k pro.</pre><p><br></p><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;\">El problema es que el sonido de la ps5 me sale por un sitio y el de pc por otro, y tengo que andar con dos auriculares a la vez para poder escuchar las alertas del pc o música mientras escucho con otros cascos el juego de la ps5.</pre><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;\"><br></pre><pre class=\"b_fw5 main\" style=\"margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;\">Me gustaría saber si hay forma de unificar el sonido, porque por mucho que busco no encuentro la solución.</pre>','2022-05-12 19:49:41',6,1,2),(3,'HOla','<font size=\"6\"><b>PRobando el post</b></font>','2022-05-12 19:59:42',1,3,1),(4,'asdas','Estó ba bien creo','2022-05-12 19:59:56',0,3,1),(5,'esd','<div style=\"font-family: sans-serif; text-align: center;\"><b><i><font size=\"6\"><u>Probando post<sup>111</sup></u></font></i></b></div><div style=\"font-family: sans-serif;\"><b style=\"\"><i style=\"\"><font size=\"5\" color=\"#ff7070\">Hola que tal</font></i></b></div><div style=\"font-family: sans-serif;\"><b style=\"\"><i style=\"\"><font size=\"5\" color=\"#ff7070\"><br></font></i></b></div><div style=\"font-family: sans-serif;\"><br><hr><br></div><div style=\"\"><ol style=\"\"><li style=\"font-family: sans-serif;\">Lista 1</li><li style=\"font-family: sans-serif;\">lista 2</li><li style=\"font-family: sans-serif;\">lista 3</li><li style=\"font-family: sans-serif;\">LIsta&nbsp;</li></ol><a href=\"http://youtube.es\">http://youtube.es</a><br></div>','2022-05-12 20:02:35',1,3,1),(6,'Ayuda Ride 4','Como consigo la Honda CBR 1000rr ?','2022-05-14 13:11:43',2,2,1),(7,'Nuevo juego de Hideo Kojima !','Se ha filtrado el nuevo&nbsp;silent hill!','2022-05-14 13:13:15',2,2,152),(8,'Ayuda Trofeos FarCry6','','2022-05-14 13:14:05',1,2,153),(9,'Gente para jugar League of legends!','','2022-05-14 13:14:35',6,2,1),(10,'Cuanto dura el nuevo Spider-man?','','2022-05-14 13:15:13',3,2,2),(11,'Nuevo modo de juego en PUBG','Soy yo o se han copiado del WarZone?','2022-05-14 13:18:28',1,2,1),(12,'Donde encuentro titanita +10 en DS3?','','2022-05-14 13:19:14',4,2,1),(13,'Bug FarCry4?','','2022-05-14 13:25:00',3,2,153),(14,'Plantilla 30k monedas ultimate team','','2022-05-14 13:25:50',2,2,153),(15,'Que os parece el nuevo sniper elite 5?','','2022-05-14 13:26:46',1,2,152),(16,'No me deja instalar pes 2009','','2022-05-14 13:27:23',2,2,1),(17,'Falta poco para Spiderman 2','Que ganas de que salga yaaa! Faltan 10 meses!','2022-05-14 13:28:17',24,2,2),(18,'Recompensas fut champions','','2022-05-14 13:28:49',0,2,2),(19,'Como conseguir dinero en Governor of Poker 3?','','2022-05-14 13:29:25',3,2,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postslikes`
--

DROP TABLE IF EXISTS `postslikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postslikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_pl` (`post`),
  KEY `fk_user_pl` (`user`),
  CONSTRAINT `fk_post_pl` FOREIGN KEY (`post`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_user_pl` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postslikes`
--

LOCK TABLES `postslikes` WRITE;
/*!40000 ALTER TABLE `postslikes` DISABLE KEYS */;
INSERT INTO `postslikes` VALUES (1,5,1),(2,10,1),(3,14,1),(4,16,1),(5,17,1),(6,15,1),(7,7,1),(8,8,1),(9,9,1),(10,10,2),(11,11,2),(12,13,2),(13,16,2),(14,14,2),(15,7,2),(16,9,2),(17,9,152),(18,6,152),(19,19,152),(20,17,2),(21,17,153),(22,2,153),(23,1,2);
/*!40000 ALTER TABLE `postslikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class` int(11) DEFAULT 3,
  `username` varchar(20) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `picture` varchar(250) DEFAULT '/img/defaultuser.png',
  `pictureid` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class` (`class`),
  CONSTRAINT `fk_class` FOREIGN KEY (`class`) REFERENCES `class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'root','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(2,2,'DiEgoSnNiPeR16','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(3,3,'4-Wheel','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(4,4,'Ace','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(5,3,'Admiral','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(6,3,'Amazon','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(7,3,'Amethyst','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(8,3,'Ami','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(9,3,'Amiga','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(10,3,'Amigo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(11,3,'Amor','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(12,3,'Amorcita','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(13,3,'Amore','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(14,3,'Amour','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(15,3,'Angel','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(16,3,'Anvil','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(17,3,'Apple','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(18,3,'AppleJack','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(19,3,'Ash','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(20,3,'Autumn','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(21,3,'Azkaban','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(22,3,'Babe','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(23,3,'Babs','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(24,3,'Baby','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(25,3,'BabyBird','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(26,3,'BabyBoo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(27,3,'BabyCakes','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(28,3,'BabyCarrot','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(29,3,'BabyMaker','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(30,3,'Backbone','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(31,3,'Bacon','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(32,3,'Baldie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(33,3,'Bambi','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(34,3,'Bambino','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(35,3,'Bandit','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(36,3,'Barbie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(37,3,'Bean','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(151,3,'Winnie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC','2022-05-12 19:49:41','/img/defaultuser.png',NULL),(152,3,'Juan','$2b$10$upHEHc9.h/0khvYMJWWaNOlqdRKMZKvlFE.50/.P0M/KLMNxuqdfG','2022-05-14 13:12:10','/img/defaultuser.png',NULL),(153,3,'Pedro','$2b$10$eBr9r3rZDsItpxwLATwIX.tx4YvKmTXd3iNGQcAi4yCFVj5ul2s1W','2022-05-14 13:13:43','/img/defaultuser.png',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-14 13:58:59
