const {cehckSession, userArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const moment = require('moment');
const path = require('path');
const router = express.Router();

/* GET - foros */
router.get('/foros/:id/:page', [cehckSession], async(req,res) => {
  req.params.page = req.params.page >= 1 ? req.params.page : 1;
  end = 10;
  start = (req.params.page*end) - end;
  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.id}`);
  counts = await dbfind(`SELECT count(id) elem FROM posts WHERE foro = ${req.params.id}`);
  if(sql.res.length == 0) return res.redirect('/');
  sql2 = await dbfind(`
  SELECT
  posts.id id,
  posts.title,
  u.picture picture,
  u.username creatorUsername,
  posts.user creatorId,
  posts.created,
  COUNT(DISTINCT l.id) likes,
  COUNT(DISTINCT c.id) comments,
  (SELECT c.created FROM comments c WHERE c.post = posts.id ORDER BY c.created DESC LIMIT 1) as lastComment,
  (SELECT u.username FROM comments c LEFT JOIN users u ON c.user = u.id WHERE c.post = posts.id ORDER BY c.created DESC LIMIT 1) as lastUser,
  (SELECT c.user FROM comments c  WHERE c.post = posts.id ORDER BY c.created DESC LIMIT 1) as lastUserId
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
        n.lastUserId = n.creatorId
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
      post: sql2.res,
      count: counts.res[0].elem == 0 ? 1 : counts.res[0].elem,
      end
    }
  });
})

/* GET - posts */
router.get('/foro/tema/:foro/:id/:page/', [cehckSession], async (req,res) => {
  req.params.page = req.params.page >= 1 ? req.params.page : 1;
  end = 5;
  start = (req.params.page*end)- end;
  counts = await dbfind(`SELECT count(id) count FROM comments WHERE post = ${req.params.id}`);
  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.id}`);
  if(sql.res.length == 0) return res.redirect('/');
  sql = await dbfind(`UPDATE posts SET views = views+1 WHERE id = ${req.params.id}`);
  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.foro}`);
  sql3 = await dbfind(`SELECT id FROM postslikes WHERE post = ${req.params.id} AND user = ${req.session.id}`);
  sql2 = await dbfind(`
    SELECT
    posts.id,
    posts.title,
    posts.content,
    posts.created,
    posts.user userId,
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
    comments.user userid,
    u.username,
    u.picture,
    COUNT(DISTINCT le.id) likes,
    comments.coment,
    (SELECT count(id) FROM comments c WHERE c.user = comments.user) as commentNum,
    (SELECT count(id) FROM posts c WHERE c.user = comments.user) as postNum,
    comments.created
    FROM comments
    LEFT JOIN comentslikes le ON le.comment = comments.id
    LEFT JOIN users u ON comments.user = u.id
    LEFT JOIN comments c ON comments.user = c.post
    LEFT JOIN postslikes l ON comments.user = l.post
    WHERE comments.post = ${req.params.id}
    GROUP BY comments.id
    LIMIT ${start},${end};
  `)
  userlikescom = false
  if(req.session.ok){
    userlikescom = await dbfind(`
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

  if(!sql3.ok) sql3.res = 0;

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
      userlikescom: userlikescom.res,
      page: req.params.page,
      count: counts.res[0].count == 0 ? 1 : counts.res[0].count,
      end
    }
  });
})

/* GET - crear post */
router.get('/nuevo_post/:id', [cehckSession,userArea], async (req,res) => {
  sql = await dbfind(`SELECT name FROM foros WHERE id=${req.params.id}`)
  if(sql.res.length == 0) return res.redirect('/');
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

/* POST - like post */
router.post('/post/like/', [cehckSession,userArea], async (req,res) => {
  postid = req.body.id;
  user = req.session.id;
  l = '*';
  try {
    sql = await dbfind(`SELECT id FROM postslikes WHERE post = ${postid} AND user = ${user}`);
    if(sql.res.length === 0){
      sql = await dbfind(`INSERT INTO postslikes(post,user) VALUES (${postid},${user})`);
      l = '+'
    }else{
      sql = await dbfind(`DELETE FROM postslikes WHERE post = ${postid} AND user = ${user}`);
      l = '-'
    }
    res.json({ok:true, action: l})
  } catch (error) {
    res.json({ok:false})
  }
});

/* GET - crear comentario */
router.get('/comentar_post/:id', [cehckSession,userArea], async (req,res) => {
  sql = await dbfind(`
    SELECT 
    posts.title posttitle,
    posts.id postid,
    posts.foro foroid,
    posts.title title,
    c.name foro
    FROM posts
    LEFT JOIN foros c ON c.id = posts.foro
    WHERE posts.id=${req.params.id}`)
  if(sql.res.length == 0) return res.redirect('/');
  res.render("crearcomentario",{
    crearcomentario: true,
    session: req.session,
    data: sql.res[0]
  });
})

/* POST - guardar comentario */
router.post('/comentar_post', [cehckSession, userArea], async (req,res) => {
  c = req.body.content.replaceAll('`','"').replaceAll("'",'"')
  sql = await dbfind(`INSERT INTO comments(coment,post,user)
                      VALUES('${c}',${req.body.postid},${req.session.id})`);
  res.send(JSON.stringify({ok: true}))
});

/* POST - like comment */
router.post('/comment/like/', [cehckSession, userArea], async (req,res) => {
  try {
   sql = await dbfind(`SELECT id FROM comentslikes WHERE comment = ${req.body.id} AND user = ${req.session.id}`);
   l = '*';
   if(sql.res.length === 0){
     sql = await dbfind(`INSERT INTO comentslikes(comment,user) VALUES (${req.body.id},${req.session.id})`);
     l = '+'
   }else{
     sql = await dbfind(`DELETE FROM comentslikes WHERE comment = ${req.body.id} AND user = ${req.session.id}`);
     l = '-'
   }
   res.json({ok:true, action: l})
  } catch (error) {
   res.json({ok:false})
  }
});
 
module.exports = router;