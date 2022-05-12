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
  created DATETIME default current_timestamp,
  picture VARCHAR(250) DEFAULT '/img/defaultuser.png',
  pictureid  VARCHAR(150),
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
  image VARCHAR(250) NOT NULL,
  imageid VARCHAR(100) NOT NUlL,
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
(3,'USER'),
(4,'DELETED');


INSERT INTO users(class,username,passwd) VALUES
(1,'root','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK'),
(2,'DiEgoSnNiPeR16','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK'),
(3,'4-Wheel','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(4,'Ace','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),     
(3,'Admiral','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'), 
(3,'Amazon','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),  
(3,'Amethyst','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Ami','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),     
(3,'Amiga','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Amigo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Amor','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Amorcita','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Amore','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Amour','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Angel','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Anvil','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Apple','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'AppleJack','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Ash','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Autumn','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Azkaban','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Babe','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Babs','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Baby','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BabyBird','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BabyBoo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BabyCakes','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BabyCarrot','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BabyMaker','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Backbone','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bacon','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Baldie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bambi','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bambino','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bandit','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Barbie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bean','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beanpole','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beast','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beautiful','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beauty','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bebe','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beef','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Beetle','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Belch','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bellbottoms','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Belle','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bello','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bessie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BettyBoop','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Biffle','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BigBird','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BigGuy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BigMac','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BigNasty','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Birdy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Biscuit','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Blimpie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Blondie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Boo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BooBear','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BooBoo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BooBug','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Boomer','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Boomhauer','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bootsie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bossy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Braniac','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Braveheart','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bridge','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BrownSugar','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bruiser','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Brutus','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bub','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bubba','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BubbleButt','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bubblegum','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bubbles','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buck','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buckeye','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bud','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buddy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buds','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buffalo','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bug','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bumblebee','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bumpkin','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Bunny','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'BunnyRabbit','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buster','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Butter','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Butterbuns','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buttercup','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Butterfinger','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Butternut','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Button','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Buzz','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'C-Dawg','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Candy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Candycane','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cannoli','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Captain','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'CaptainCrunch','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Carrot','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cat','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Catwoman','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cello','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chain','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Champ','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chance','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheddar','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheeky','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheerio','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheese','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheesestick','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cheeto','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chef','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cherry','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chewbacca','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chica','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'ChickenLegs','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'ChickenWing','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chickie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chico','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chief','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chili','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chip','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chiquita','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chubs','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chuckles','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chum','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Chump','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'CindyLouWho','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cinnamon','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cloud','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Coach','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'CokeZero','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'ColdBrew','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'ColdFront','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Colonel','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Con','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Conductor','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cookie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'CookieDough','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cotton','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cottonball','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cowboy','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Creedence','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Creep','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Cricket','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC'),
(3,'Winnie','$2b$10$sZzmMtdQVU.Akcj9O1eeZOcp5evCDTo8LLwd.1mmxFfZ.ugvsSquC');

UPDATE users SET picture = 'http://res.cloudinary.com/dqaomwude/image/upload/v1649183101/vdnloy9vqeg7k0ermtsm.jpg', pictureid = 'g3zizhasrusxp0xceqam' WHERE id = 1;
UPDATE users SET picture = 'http://res.cloudinary.com/dqaomwude/image/upload/v1649183781/xw8jg6izvd92zwwcpqjx.jpg', pictureid = 'xw8jg6izvd92zwwcpqjx' WHERE id = 2;

INSERT INTO categorias VALUES
(1,'Videojuegos'),
(2,'Más que videojuegos'),
(3,'Sistemas');

INSERT INTO foros VALUES
(1,'OFF Topic y Humor','Hablemos de todo menos de juegos o temas de otros foros.','https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-talk-chat-flatart-icons-solid-flatarticons.png',null,'#e69800',2),
(2,'Videojuegos en general','Temas sobre juegos en general, Lanzamientos, aztuqalidad, gustos, preguntas...','https://img.icons8.com/glyph-neue/100/000000/controller.png',null,'#ed4000',1),
(3,'Noticias y actualidad','Tribuna abierta para comentar las noticias del mundo del videojuego.','https://img.icons8.com/ios/100/000000/globe--v1.png',null,'#ed4000',1),
(4,'PlayStation','Videojuegos, PSN, PSPlus, PlayStation VR y más para los seguidores de consolas Sony','https://img.icons8.com/windows/100/000000/play-station.png',null,'#1a5cad',3),
(5,'Xbox','Juegos, Xbox Live, Arcade, retrocompatibilidad y todo sobre las consolas Xbox de Microsoft.','https://img.icons8.com/ios-filled/100/000000/xbox.png',null,'#50880b',3),
(6,'PC / Hardware','Jugadores de PC, Steam, juegos digitales y expertos en configurar equipos y presupuestos.','https://img.icons8.com/ios-filled/100/000000/computer.png',null,'#be0b0b',3);


INSERT INTO posts(title,content,foro,user) VALUES
('¿Pokémon favorito?','<h1 style="font-size: 2.375rem; color: rgb(17, 17, 17); font-family: &quot;Roboto Condensed&quot;, Arial;"><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;">Bulbasaur.</pre><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="Bulbasaur | Pokédex"><br></pre><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;"><br></pre><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; color: rgb(0, 0, 0); overflow: hidden; font-weight: normal !important;">Se me ocurrió preguntarlo, a propósito del regalo que le hizo el embajador Japonés al presidente electo de Chile, Gabriel Boric quien asume la presidencia hoy. : )</pre></h1>\n',1,1),
('Sonido de PC y PS5 a la vez','<pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;">Buenas, hago stream con la capturadora interna de elgato 4k pro.</pre><p><br></p><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;">El problema es que el sonido de la ps5 me sale por un sitio y el de pc por otro, y tengo que andar con dos auriculares a la vez para poder escuchar las alertas del pc o música mientras escucho con otros cascos el juego de la ps5.</pre><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;"><br></pre><pre class="b_fw5 main" style="margin-right: .625rem; margin-left: .625rem; font-family: Roboto, Arial; font-size: 1.125rem; overflow-wrap: break-word; white-space: pre-line; line-height: 1.6875rem; overflow: hidden;">Me gustaría saber si hay forma de unificar el sonido, porque por mucho que busco no encuentro la solución.</pre>',1,2);

INSERT INTO comments(coment,post,user) VALUES
('Mariiitooooo',1,2);




    