const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/* sql */
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pkmonkey"
});

function dbfind(sql){
  console.log(sql);
  try {
    return new Promise(res => {
      con.query(sql, function (err, result) {
        if (err)  res(false)
        res(result)
      });
    })
  } catch (error) {
    return false;
  }
}

/* GET - login */
router.get('/login', async (req, res) => {
  res.render("login/login",{
    login: true
  });
})

/* POST - login */
router.post('/login', async(req, res) => {
  sql = await dbfind(`SELECT username, class, passwd, picture FROM users WHERE username = '${req.body.username}'`);
  if(sql.length && bcrypt.compareSync(req.body.password, sql[0].passwd)){
    let token = jwt.sign(
      {
        username: sql[0].username,
        class: sql[0].class,
        picture: sql[0].picture
      },
      process.env.SEED,
      { expiresIn: 9999 }
    );
    res.setHeader("X-Access-Token", token);
    return res.send(JSON.stringify({ok: true, token}))
  }
  return res.send(JSON.stringify({ok: false}))
})

/* GET- register */
router.get('/register', (req, res) => {
  res.render("login/register",{
    login: true
  });
})

/* PUT - register user */
router.put('/register', async (req, res) => {
  username = req.body.username;
  sql = await dbfind(`SELECT username FROM users WHERE username = '${username}'`);
  if(!sql.length){
    password = bcrypt.hashSync(req.body.password, 10)
    sql = await dbfind(`INSERT INTO users VALUES (null,0,'${username}','${password}','/img/defaultuser.png')`)
    return res.send(JSON.stringify({ok: true}))
  }
  return res.send(JSON.stringify({ok: false}))
})

module.exports = router;
