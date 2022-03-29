const express = require("express");
const router = express.Router();
const {cehckSession, userArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const path = require('path');
const moment = require('moment');
const { log } = require("console");

/* GET - página principal categorias */
router.get('/foros/:id/:page', [cehckSession], async(req,res) => {
  req.params.page = req.params.page >= 1 ? req.params.page : 1;
  end = req.params.page*50;
  start = end - 50;

  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.id}`);
  sql2 = await dbfind(`
  SELECT
  posts.id id,
  posts.title,
  u.picture picture,
  u.username creatorUsername,
  posts.created,
  COUNT(DISTINCT l.id) likes,
  COUNT(DISTINCT c.id) comments,
  (SELECT c.created FROM comments c WHERE c.post = posts.id ORDER BY c.created DESC LIMIT 1) as lastComment,
  (SELECT u.username FROM comments c LEFT JOIN users u ON c.user = u.id WHERE c.post = posts.id ORDER BY c.created DESC LIMIT 1) as lastUser
  FROM posts
  LEFT JOIN users u ON posts.user = u.id
  LEFT JOIN postslikes l ON posts.id = l.post
  LEFT JOIN comments c ON posts.id = c.post
  WHERE posts.foro = ${req.params.id}
  GROUP BY posts.id
  ORDER BY lastComment
  LIMIT ${start},${end};
  `);
  if(sql2.res.length >= 1){
    sql2.res.map(n => {
      creado = moment(n.created)
      hoy = moment(new Date)
      n.created = {
        d: hoy.diff(creado,'days'),
        mo: hoy.diff(creado,'months'),
        y: hoy.diff(creado,'years')
      };
      if(n.lastComment != null){
        creado = moment(n.lastComment)
        n.lastComment = {
          d: hoy.diff(creado,'days'),
          mo: hoy.diff(creado,'months'),
          y: hoy.diff(creado,'years')
        };
      }
    });
  }
  
  res.render("categoria",{
    categoria: true,
    session: req.session,
    data: {
      id: req.params.id,
      page: req.params.page,
      foro: sql.res[0].name,
      post: sql2.res
    }
  });
})

/* GET - crear post */
router.get('/nuevo_post/:id', [cehckSession,userArea], async (req,res) => {
  sql = await dbfind(`SELECT name FROM foros WHERE id=${req.params.id}`)
  if(!sql.res){
    return res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
  }
  res.render("crearpost",{
    crearpost: true,
    session: req.session,
    data: {
      id: req.params.id,
      categoria: sql.res[0].name
    }
  });
})

/* POST - guardar post */
router.post('/save_post', [cehckSession, userArea], async (req,res) => {
  c = req.body.content.replaceAll('`','"').replaceAll("'",'"')
  sql = await dbfind(`INSERT INTO posts(title,content,foro,user)
                      VALUES('${req.body.title}','${c}',${req.body.foro},${req.session.id})`);
  res.send(JSON.stringify({ok: true}))
});

module.exports = router;


