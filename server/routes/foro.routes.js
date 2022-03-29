const express = require("express");
const router = express.Router();
const {cehckSession, userArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const path = require('path');
const { log } = require("console");

/* GET - página principal categorias */
router.get('/foros/:id/:page', [cehckSession], async(req,res) => {
  req.params.page = req.params.page >= 1 ? req.params.page : 1;
  end = req.params.page*50;
  start = end - 50;

  sql = await dbfind(`SELECT name FROM foros WHERE id = ${req.params.id}`);
  sql2 = await dbfind(`
  SELECT  posts.id id,
          posts.title,
          posts.user creatorId,
          u1.username creatorUsername,
          posts.userres lastUserId,
          u2.username lastUserName,
          posts.created
          FROM posts
          LEFT JOIN users u1 ON posts.user = u1.id
          LEFT JOIN users u2 ON posts.userres = u2.id
          WHERE posts.foro = ${req.params.id}
          LIMIT ${start},${end};
  `)
  console.log(sql2);
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
                      console.log(c);
  res.send(JSON.stringify({ok: true}))
});




/* SELECT posts.id id,
posts.title,
posts.user creatorId,
u1.username creatorUsername,
posts.userres lastUserId,
u2.username lastUserName,
posts.created,
count(l.post) likes,
count(c.post) comments
FROM posts
LEFT JOIN
users u1 ON posts.user = u1.id
LEFT JOIN
users u2 ON posts.userres = u2.id
LEFT JOIN postslikes l ON posts.id = l.post
LEFT JOIN comments c ON posts.id = c.post
WHERE posts.foro = 1
LIMIT 0,50; */

module.exports = router;
