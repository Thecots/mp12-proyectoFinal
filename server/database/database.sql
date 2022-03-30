DROP DATABASE IF EXISTS pkmonkey;
CREATE DATABASE pkmonkey;
USE pkmonkey;


CREATE table class(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  class VARCHAR(20)
);

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  class INT DEFAULT 3,
  username VARCHAR(20) NOT NULL,
  passwd VARCHAR(100) NOT NULL,
  picture VARCHAR(100) DEFAULT '/img/defaultuser.png',
  FOREIGN KEY fk_class(class) REFERENCES class(id)
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

CREATE TABLE posts(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content LONGTEXT NOT NULL,
  created DATETIME default current_timestamp,
  views INT default 0,
  foro INT NOT NULL,
  user INT NOT NULL,
  FOREIGN KEY fk_foro(foro) REFERENCES foros(id),
  FOREIGN KEY fk_user(user) REFERENCES users(id)
  );

CREATE TABLE postslikes(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  post INT not null,
  user INT not null,
  FOREIGN KEY fk_post_pl(post) REFERENCES posts(id),
  FOREIGN KEY fk_user_pl(user) REFERENCES users(id)
);

CREATE TABLE comments(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  coment LONGTEXT NOT NULL,
  post INT not null,
  user INT not null,
  created DATETIME default current_timestamp,
  FOREIGN KEY fk_post_pc(post) REFERENCES posts(id),
  FOREIGN KEY fk_user_pc(user) REFERENCES users(id)
);

CREATE TABLE comentslikes(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  comment INT not null,
  user INT not null,
  FOREIGN KEY fk_comment_cl(comment) REFERENCES comments(id),
  FOREIGN KEY fk_user_cl(user) REFERENCES users(id)
);


INSERT INTO class VALUES
(1,'OWNER'),
(2,'ADMINISTRATOR'),
(3,'USER');


INSERT INTO users VALUES
(1,1,'root','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','/img/defaultuser.png'),
(2,3,'DiEgoSnNiPeR16','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','/img/defaultuser.png');


INSERT INTO categorias VALUES
(1,'Videojuegos'),
(2,'Más que videojuegos'),
(3,'Sistemas');

INSERT INTO foros VALUES
(1,'OFF Topic y Humor','Hablemos de todo menos de juegos o temas de otros foros.','https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-talk-chat-flatart-icons-solid-flatarticons.png','#e69800',2),
(2,'Videojuegos en general','Temas sobre juegos en general, Lanzamientos, aztuqalidad, gustos, preguntas...','https://img.icons8.com/glyph-neue/100/000000/controller.png','#ed4000',1),
(3,'Noticias y actualidad','Tribuna abierta para comentar las noticias del mundo del videojuego.','https://img.icons8.com/ios/100/000000/globe--v1.png','#ed4000',1),
(4,'PlayStation','Videojuegos, PSN, PSPlus, PlayStation VR y más para los seguidores de consolas Sony','https://img.icons8.com/windows/100/000000/play-station.png','#1a5cad',3),
(5,'Xbox','Juegos, Xbox Live, Arcade, retrocompatibilidad y todo sobre las consolas Xbox de Microsoft.','https://img.icons8.com/ios-filled/100/000000/xbox.png','#50880b',3),
(6,'PC / Hardware','Jugadores de PC, Steam, juegos digitales y expertos en configurar equipos y presupuestos.','https://img.icons8.com/ios-filled/100/000000/computer.png','#be0b0b',3);


INSERT INTO posts(title,content,foro,user) VALUES
('¿Pokémon favorito?','<h1 style="font-size: 38px; color: rgb(17, 17, 17); font-family: &quot;Roboto Condensed&quot;, Arial;"><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;">Bulbasaur.</pre><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="Bulbasaur | Pokédex"><br></pre><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;"><br></pre><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;">Se me ocurrió preguntarlo, a propósito del regalo que le hizo el embajador Japonés al presidente electo de Chile, Gabriel Boric quien asume la presidencia hoy. : )</pre></h1>\n',1,1),
('Sonido de PC y PS5 a la vez','<pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; overflow: hidden;">Buenas, hago stream con la capturadora interna de elgato 4k pro.</pre><p><br></p><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; overflow: hidden;">El problema es que el sonido de la ps5 me sale por un sitio y el de pc por otro, y tengo que andar con dos auriculares a la vez para poder escuchar las alertas del pc o música mientras escucho con otros cascos el juego de la ps5.</pre><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; overflow: hidden;"><br></pre><pre class="b_fw5 main" style="margin-right: 10px; margin-left: 10px; font-family: Roboto, Arial; font-size: 18px; overflow-wrap: break-word; white-space: pre-line; line-height: 27px; overflow: hidden;">Me gustaría saber si hay forma de unificar el sonido, porque por mucho que busco no encuentro la solución.</pre>',1,2);

INSERT INTO comments(coment,post,user) VALUES
('Mariiitooooo',1,2);




    