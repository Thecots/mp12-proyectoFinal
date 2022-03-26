DROP DATABASE IF EXISTS pkmonkey;
CREATE DATABASE pkmonkey;
USE pkmonkey;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  class INT DEFAULT 0,
  username VARCHAR(20) NOT NULL,
  passwd VARCHAR(100) NOT NULL,
  picture VARCHAR(100) DEFAULT '/img/defaultuser.png'
);

CREATE TABLE categorias(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  categoria VARCHAR(50) NOT NULL
);

CREATE TABLE foros(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  image VARCHAR(200) NOT NULL,
  color VARCHAR(50),
  categoria INT NOT NULL,
  FOREIGN KEY fk_categoria(categoria) REFERENCES categorias(id)
);


INSERT INTO users VALUES
(null,1,'root','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','/img/defaultuser.png');

INSERT INTO categorias VALUES
(null,'Videojuegos'),
(null,'Más que videojuegos'),
(null,'Sistemas');

INSERT INTO foros VALUES
(null,'OFF Topic y Humor','Hablemos de todo menos de juegos o temas de otros foros.','https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-talk-chat-flatart-icons-solid-flatarticons.png','#e69800',2),
(null,'Videojuegos en general','Temas sobre juegos en general, Lanzamientos, aztuqalidad, gustos, preguntas...','https://img.icons8.com/glyph-neue/100/000000/controller.png','#ed4000',1),
(null,'Noticias y actualidad','Tribuna abierta para comentar las noticias del mundo del videojuego.','https://img.icons8.com/ios/100/000000/globe--v1.png','#ed4000',1),
(null,'PlayStation','Videojuegos, PSN, PSPlus, PlayStation VR y más para los seguidores de consolas Sony','https://img.icons8.com/windows/100/000000/play-station.png','#1a5cad',3),
(null,'Xbox','Juegos, Xbox Live, Arcade, retrocompatibilidad y todo sobre las consolas Xbox de Microsoft.','https://img.icons8.com/ios-filled/100/000000/xbox.png','#50880b',3),
(null,'PC / Hardware','Jugadores de PC, Steam, juegos digitales y expertos en configurar equipos y presupuestos.','https://img.icons8.com/ios-filled/100/000000/computer.png','#be0b0b',3);