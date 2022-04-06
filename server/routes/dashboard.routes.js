const {cehckSession, userArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();


/*
    DASHBOARD 
    página prinipal ->
      header
        count(u) count(t) count(c)
      select
        graphic
          - this month user registred
          - this month post
          - last month comments


*/
router.get('/dashboard',[cehckSession,userArea], async(req,res) => {
  const sql = await dbfind('SELECT count(id) as users FROM users ORDER BY  MONTH(created)')
  console.log(sql.res);
  res.render('dashboard',{
    session: req.session,
    dashboard: true
  })
});

module.exports = router;
