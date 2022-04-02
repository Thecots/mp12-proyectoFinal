const express = require("express");
const router = express.Router();
const { dbfind } = require("../middlewares/dbfind");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/* GET - login */
router.get('/login', async (req, res) => {
  res.render("login/login",{
    login: true
  });
})

/* POST - login */
router.post('/login', async(req, res) => {
  sql = await dbfind(`SELECT username, class, id, passwd, picture FROM users WHERE username = '${req.body.username}'`);
  if(sql.res.length && bcrypt.compareSync(req.body.password, sql.res[0].passwd)){
    let token = jwt.sign(
      {
        username: sql.res[0].username,
        id: sql.res[0].id,
        class: sql.res[0].class,
        picture: sql.res[0].picture
      },
      process.env.SEED,
      { expiresIn: '9999days' }
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
  if(!sql.res.length){
    password = bcrypt.hashSync(req.body.password, 10)
    sql = await dbfind(`INSERT INTO users(username,passwd) VALUES ('${username}','${password}')`)
    return res.send(JSON.stringify({ok: true}))
  }
  return res.send(JSON.stringify({ok: false}))
})






module.exports = router;
