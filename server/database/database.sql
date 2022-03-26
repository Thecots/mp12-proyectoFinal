DROP DATABASE IF EXISTS pkmonkey;
CREATE DATABASE pkmonkey;
USE pkmonkey;

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  class INT DEFAULT 0,
  username VARCHAR(20) NOT NULL,
  passwd VARCHAR(100) NOT NULL,
  picture VARCHAR(100) DEFAULT '/img/defaultPicture.png'
);

INSERT INTO users VALUES
(null,1,'root','root',null);