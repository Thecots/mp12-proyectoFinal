const express = require("express");
const router = express.Router();
const {cehckSession} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const path = require('path');

/* GET - perfil */
router.get('/profile/:id', [cehckSession], async (req,res) => {
  sql = await dbfind(`SELECT * FROM users WHERE username='${req.params.id}'`)

  if(sql.res.length == 0){
    return res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
  }

  res.render("perfil",{
    profile: true,
    session: req.session,
  });
})

module.exports = router;
