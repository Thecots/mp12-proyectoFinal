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
  ORDER BY IF(ISNULL(lastComment), posts.created, lastComment) DESC
  LIMIT ${start},${end};
  `);
  if(sql2.res.length >= 1){
    sql2.res.map(n => {
      n.lastUser = n.lastUser == null ? n.creatorUsername : n.lastUser
      hoy = moment(new Date)
      creado = moment(n.created)
      n.created = {
        s: hoy.diff(creado,'seconds'),
        m: hoy.diff(creado,'minutes'),
        h: hoy.diff(creado,'hours'),
        d: hoy.diff(creado,'days'),
        mo: hoy.diff(creado,'months'),
        y: hoy.diff(creado,'years')
      }
      if(n.lastComment != null){
        creado = moment(n.lastComment)
        n.lastComment = {
          s: hoy.diff(creado,'seconds'),
          m: hoy.diff(creado,'minutes'),
          h: hoy.diff(creado,'hours'),
          d: hoy.diff(creado,'days'),
          mo: hoy.diff(creado,'months'),
          y: hoy.diff(creado,'years')
        } 
      }else{
        n.lastComment = n.created;
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

/* GET - post */
router.get('/foro/tema/:foro/:id', [cehckSession], async (req,res) => {
  sql = await dbfind(`UPDATE posts SET views = views+1 WHERE id = ${req.params.id}`);
  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.foro}`);
  sql3 = await dbfind(`SELECT id FROM postslikes WHERE post = ${req.params.id} AND user = ${req.session.id}`);
  sql2 = await dbfind(`
  SELECT
  posts.id,
  posts.title,
  posts.content,
  posts.created,
  posts.views,
  (SELECT count(id) FROM comments c WHERE c.user = posts.user) as commentNum,
  (SELECT count(id) FROM posts c WHERE c.user = posts.user) as postNum,
  u.picture,
  COUNT(DISTINCT l.id) likes,
  COUNT(DISTINCT c.id) countcoment,
  u.username
  FROM posts
  LEFT JOIN users u ON posts.user = u.id
  LEFT JOIN comments c ON posts.id = c.post
  LEFT JOIN postslikes l ON posts.id = l.post
  WHERE posts.id = ${req.params.id}
  `);
  com = await dbfind(`
  SELECT
  comments.id,
  u.username,
  u.picture,
  COUNT(DISTINCT le.id) likes,
  comments.coment,
  (SELECT count(id) FROM comments c WHERE c.user = comments.user) as commentNum,
  (SELECT count(id) FROM posts c WHERE c.user = comments.user) as postNum,
  comments.created
  FROM comments
  LEFT JOIN comentslikes le ON le.comment = comments.post
  LEFT JOIN users u ON comments.user = u.id
  LEFT JOIN comments c ON comments.user = c.post
  LEFT JOIN postslikes l ON comments.user = l.post
  WHERE comments.post = ${req.params.id}
  GROUP BY comments.id
  `)

  userlikescom = false
  if(req.session.ok){
    userlikescom = dbfind(`
    SELECT
    c.comment
    FROM comentslikes as c
    WHERE c.user = ${req.session.id}
    `)
  }

  com.res.map(n => {
    hoy = moment(new Date)
    creado = moment(n.created)
    n.created = {
      s: hoy.diff(creado,'seconds'),
      m: hoy.diff(creado,'minutes'),
      h: hoy.diff(creado,'hours'),
      d: hoy.diff(creado,'days'),
      mo: hoy.diff(creado,'months'),
      y: hoy.diff(creado,'years')
    }
  });

  if(!sql3.ok){
    sql3.res = 0;
  }

  sql2.res.map(n => {
    creado = moment(n.created)
    hoy = moment(new Date)
    n.created = {
      s: hoy.diff(creado,'seconds'),
      m: hoy.diff(creado,'minutes'),
      h: hoy.diff(creado,'hours'),
      d: hoy.diff(creado,'days'),
      mo: hoy.diff(creado,'months'),
      y: hoy.diff(creado,'years')
  }})
  res.render("post",{
    post: true,
    session: req.session,
    data: {
      foro: sql.res[0].name,
      foroid: req.params.foro,
      id: req.params.id,
      post: sql2.res[0],
      like: sql3.res,
      com: com.res,
      userlikescom: userlikescom.res
    }
  });
})


/* GET - like post */
router.get('/like/:foro/:id', [cehckSession], async (req,res) => {
  postid = req.params.id;
  foro = req.params.foro;
  user = req.session.id;
  sql = await dbfind(`SELECT id FROM postslikes WHERE post = ${postid} AND user = ${user}`);
  if(sql.res.length === 0){
    sql = await dbfind(`INSERT INTO postslikes(post,user) VALUES (${postid},${user})`);
  }else{
    sql = await dbfind(`DELETE FROM postslikes WHERE post = ${postid} AND user = ${user}`);
  }
  res.redirect('/foro/tema/'+foro+'/'+postid);
});


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
      foro: sql.res[0].name
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


