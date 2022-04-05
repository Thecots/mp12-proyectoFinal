const {cehckSession} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();

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
  if(!sql.ok) return res.redirect('*')
  let cat = await dbfind('SELECT categoria FROM categorias');
  res.render("index",{
    home: true,
    session: req.session,
    data: {
      sql: sql.res,
      cat: cat.res
      }
  });
})

router.use(require('./login.routes'))
router.use(require('./foro.routes'))
router.use(require('./profile.routes'))

/* 404 */
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
});

module.exports = router;
