const {cehckSession} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();

/* GET - perfil */
router.get('/profile/:id', [cehckSession], async (req,res) => {
  sql = await dbfind(`SELECT * FROM users WHERE id='${req.params.id}'`)
  if(sql.res.length == 0) return res.redirect('/');
  
  res.render("perfil",{
    profile: true,
    session: req.session,
  });
})

module.exports = router;
