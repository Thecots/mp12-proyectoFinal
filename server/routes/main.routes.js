const express = require("express");
const router = express.Router();
const path = require('path');
const {cehckSession} = require('./../middlewares/session');
const mysql = require('mysql');


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


router.get('/', [cehckSession], async(req, res) => {
  let sql = await dbfind(`SELECT foros.name name,
                          foros.description description,
                          foros.id,
                          foros.image,
                          foros.color,
                          categorias.categoria
                          FROM foros
                          LEFT JOIN categorias ON foros.categoria = categorias.id
                          ORDER BY categorias.id`);
  res.render("index",{
    home: true,
    session: req.session,
    data: {
      sql,
      cat: sql.filter((v,i,a)=>a.findIndex(v2=>(v2.categoria===v.categoria))===i).map(n => n.categoria)
    },

  });
})

router.use(require('./login.routes'))

/* 404 */
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
});

module.exports = router;
