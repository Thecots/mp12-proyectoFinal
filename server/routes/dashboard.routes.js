const {cehckSession, userArea, adminArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();
const moment = require('moment');

router.get('/dashboard',[cehckSession,userArea, adminArea], async(req,res) => {
  const users = await dbfind('SELECT count(id) as users FROM users')
  const posts = await dbfind('SELECT count(id) as posts from posts')
  const comments = await dbfind('SELECT count(id) as comments from comments')
  const likesp = await dbfind('SELECT count(id) as likes from postslikes')
  const likesc = await dbfind('SELECT count(id) as likes from comentslikes')
  const likes = likesp.res[0].likes+likesc.res[0].likes;


  const date = new Date();
  const usersres = await dbfind(`SELECT COUNT(id) as users FROM users WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.
    getFullYear()}`);
  const postsres = await dbfind(`SELECT COUNT(id) as posts FROM posts WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.
    getFullYear()}`);
  const commentsres = await dbfind(`SELECT COUNT(id) as comments FROM comments WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.
      getFullYear()}`);

  res.render('dashboard',{
    session: req.session,
    dashboard: true,
    num: {users: users.res[0].users, posts: posts.res[0].posts, comments: comments.res[0].comments, likes: likes },
    tm: {
      users: usersres.res[0].users,
      posts: postsres.res[0].posts,
      comments: commentsres.res[0].comments
    }
  })
});

router.get('/dashboard/usuarios',[cehckSession,userArea, adminArea], async(req,res) => { 
  const users = await dbfind('SELECT id, class,  username, created, picture FROM users')
  users.res.map(n => {
    n.created = moment(n.created).format('MM/DD/YYYY')
  })
  res.render('dasboardUsuarios',{
    session: req.session,
    dashboard: true,
    users: users.res
  })
});

router.get('/dashboard/categorias',[cehckSession,userArea, adminArea], async(req,res) => { 
  const categorias = await dbfind(`SELECT categorias.*, (SELECT count(*) FROM foros WHERE foros.categoria = categorias.id) as foros FROM categorias`);
  res.render('dashboardCategorias',{
    session: req.session,
    dashboard: true,
    cat: categorias.res
    })
});


router.get('/dashboard/foro',[cehckSession,userArea, adminArea], async(req,res) => { 
  const foro = await dbfind(`SELECT foros.*, c.categoria as cat FROM foros LEFT JOIN categorias as c ON c.id = foros.
  categoria
  `);
  const categoria = await dbfind(`SELECT * FROM categorias`);


  res.render('dashboardForo',{
    session: req.session,
    dashboard: true,
    foro: foro.res,
    cat: categoria.res
    })
});


router.post('/editarUser', [cehckSession,userArea, adminArea], async(req,res) => { 
  const users = await dbfind(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  if(users.res.length == 0 || users.res[0].id == req.body.id){

    p1 = req.body.admin == true ? ', class = 2' : ", class = 3" ;
    p2 = req.body.deletefoto == true ? ", picture = '/img/defaultuser.png'" : "";

    users2 = await dbfind(`UPDATE users SET
    username = '${req.body.username}' ${p1} ${p2}
    WHERE id = ${req.body.id}`)
    res.json({ok:true,username:req.body.username, admin: req.body.admin, foto: req.body.deletefoto, id: req.body.id })
  }else{
    res.json({ok:false})
  }
  
})

router.post('/editarCategoria', [cehckSession,userArea, adminArea], async(req,res) => { 
  const users = await dbfind(`SELECT * FROM categorias WHERE categoria = '${req.body.categoria}'`)
  if(users.res.length == 0 || users.res[0].id == req.body.id){
    users2 = await dbfind(`UPDATE categorias SET categoria = '${req.body.categoria}' WHERE id = ${req.body.id}`)
    res.json({ok:true,categoria:req.body.categoria})
  }else{
    res.json({ok:false})
  }
  
});


router.post('/ban',[cehckSession,userArea, adminArea], async(req,res) => { 
  const users = await dbfind(`UPDATE users SET class = 4 WHERE id = ${req.body.id}`)
  if(users.ok)res.json({ok:true})
  else res.json({ok:false})
  
});


router.post('/deleteUser',[cehckSession,userArea, adminArea], async(req,res) => { 
  const id = req.body.id;
  /* comentslikes */
  cl = await dbfind(`
  DELETE comentslikes FROM comentslikes
  LEFT JOIN comments ON comentslikes.comment = comments.id LEFT JOIN posts ON posts.id = comments.post WHERE posts.user = ${id}`);
  /* postlikes */
  pl = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post WHERE posts.user = ${id}`);
  /* comments */
  c = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post WHERE posts.user = ${id}`);   
  /* posts */
  p = await dbfind(`DELETE posts FROM posts WHERE user = ${id}`);
  /* user */
  u = await dbfind(`DELETE users FROM users WHERE id = ${id}`);

  if(cl.ok && pl.ok && c.ok && p.ok && u.ok){
    return res.json({ok:true})
  }
  res.json({ok:false})
});

router.post('/deletePost',[cehckSession,userArea, adminArea], async(req,res) => { 
  const id = req.body.id;
  /* comentslikes */
  cl = await dbfind(`
  DELETE comentslikes FROM comentslikes
  LEFT JOIN comments ON comentslikes.comment = comments.id LEFT JOIN posts ON posts.id = comments.post WHERE posts.id = ${id}`);
  /* postlikes */
  pl = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post WHERE posts.id = ${id}`);
  /* comments */
  c = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post WHERE posts.id = ${id}`);   
  /* posts */
  p = await dbfind(`DELETE posts FROM posts WHERE id = ${id}`);

  if(cl.ok && pl.ok && c.ok && p.ok){
    return res.json({ok:true})
  }
  res.json({ok:false})
});

router.post("/newCategory", [cehckSession,userArea, adminArea], async(req,res) => {
  c = await dbfind(`INSERT INTO categorias(categoria) VALUES('${req.body.categoria}')`);
  if(c.ok) res.json({ok:true, cat:req.body.categoria})
  else res.json({ok:true}) 
});

router.post('/deleteCategoria',[cehckSession,userArea, adminArea], async(req,res) => { 
  const id = req.body.id;
   /* comentslikes */
   cl = await dbfind(`
    DELETE comentslikes FROM comentslikes
    LEFT JOIN comments ON comentslikes.comment = comments.id
    LEFT JOIN posts ON posts.id = comments.post
    LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);

  /* postlikes */
  pl = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);

  /* comments */
  c = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria =  ${id}`); 

  /* posts */
  p = await dbfind(`DELETE posts FROM posts LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);

  /* foros */
  f = await dbfind(`DELETE foros FROM foros WHERE categoria = ${id}`);
  /* categoria */
  ca = await dbfind(`DELETE categorias FROM categorias WHERE id = ${id}`);

  if(cl){
    return res.json({ok:true})
  }
  res.json({ok:false})
});


router.post('/deleteForo',[cehckSession,userArea, adminArea], async(req,res) => { 
  const id = req.body.id;
   /* comentslikes */
   cl = await dbfind(`
    DELETE comentslikes FROM comentslikes
    LEFT JOIN comments ON comentslikes.comment = comments.id
    LEFT JOIN posts ON posts.id = comments.post
    LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* postlikes */
  pl = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* comments */
  c = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id =  ${id}`); 
  /* posts */
  p = await dbfind(`DELETE posts FROM posts LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* foros */
  f = await dbfind(`DELETE foros FROM foros WHERE id = ${id}`);


  if(cl.ok && pl.ok && c.ok && p.ok && f.ok){
    return res.json({ok:true})
  }
  res.json({ok:false})
});


router.get('/dashboard/posts', [cehckSession,userArea, adminArea], async(req,res) => {
  const sql = await dbfind(`
  SELECT
  posts.id as id,
  posts.title,
  posts.created,
  posts.views,
  posts.foro,
  u.username,
  (SELECT count(*) FROM postslikes as ps WHERE ps.post = posts.id) as likes,
  (SELECT count(*) FROM comments as co WHERE co.post = posts.id) as comments
  FROM posts
  LEFT JOIN users as u ON u.id = posts.user`
  );

  sql.res.map(n => {
    n.created = moment(n.created).format('MM/DD/YYYY')
  })

  res.render('dasboardPosts',{
    session: req.session,
    dashboard: true,
    post: sql.res
    })
})

module.exports = router;
