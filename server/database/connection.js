const mysql = require('mysql');

return  mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});