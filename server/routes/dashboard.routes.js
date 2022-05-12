const {cehckSession, userArea, adminArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();
const moment = require('moment');
const upload = require('../middlewares/multer');
const fs = require('fs');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dqaomwude',
  api_key: '642551195527337',
  api_secret: 'y-UkdiFtaT4IbChRWlE8RtR5OQk'
})

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
  f.name,
  (SELECT count(*) FROM postslikes as ps WHERE ps.post = posts.id) as likes,
  (SELECT count(*) FROM comments as co WHERE co.post = posts.id) as comments
  FROM posts
  LEFT JOIN users as u ON u.id = posts.user
  LEFT JOIN foros as f ON f.id = posts.foro`
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


router.post('/createforo',[cehckSession,userArea, adminArea, upload()], async (req,res) => {
  const data = JSON.parse(req.body.data)
  
  try {
    const imgc = await cloudinary.v2.uploader.upload(req.file.path);
    const sql = await dbfind(`INSERT INTO foros VALUES (null,'${data.name}','${data.description}','${imgc.url}','${imgc.public_id}', '${data.fondo}', ${parseInt(data.categoria)})`)
    fs.unlink(path.join(__dirname,`../public/img/temp/${req.file.filename}`), function(err) {
      if (err) console.log('error, img no deleted :(');});
    res.json({ok:true})
  } catch (error) {
    res.json({ok:false})
  }
})

router.post('/getCategorias', [cehckSession,userArea, adminArea],  async (req,res) => {
  const categoria = await dbfind(`SELECT * FROM categorias`);
  res.json({cat: categoria.res})
})

router.post('/editarForo' , [cehckSession,userArea, adminArea, upload()], async(req,res) => {
  data = JSON.parse(req.body.data)
  foro =  await dbfind(`SELECT * FROM foros WHERE id = ${data.id} `)

  if(req.file == undefined){
    sql = await dbfind(`UPDATE foros SET name = '${data.name}', description = '${data.description}', color = '${data.fondo}', categoria = ${parseInt(data.categoria)} WHERE id = ${data.id} `)
  }else{
    const imgc = await cloudinary.v2.uploader.upload(req.file.path);
    if(foro.res[0].imageid != null){
      await cloudinary.v2.uploader.destroy(foro.res[0].imageid);
    }
    fs.unlink(path.join(__dirname,`../public/img/temp/${req.file.filename}`), function(err) {
      if (err) console.log('error, img no deleted :(');});

    sql = await dbfind(`UPDATE foros SET name = '${data.name}', description = '${data.description}', color = '${data.fondo}', categoria = ${parseInt(data.categoria)} ,image = '${imgc.url}', imageid = '${imgc.public_id}' WHERE id = ${data.id} `)
  }
  
  res.json({ok: true})
})


router.get('/dashboard/comentarios', [cehckSession,userArea, adminArea],  async (req,res) => {
  sql = await dbfind(`SELECT comments.*, p.title, p.foro, f.name , f.categoria, u.username FROM comments LEFT JOIN posts as p ON p.id = comments.post LEFT JOIN foros as f ON f.id = p.foro LEFT JOIN users as u ON u.id = comments.user;`);
  console.log(sql.res);
  res.render('dashboardComments',{
    session: req.session,
    dashboard: true,
    comments: sql.res
    })
});

router.post('/deleteComment' , [cehckSession,userArea, adminArea],  async (req,res) => {
  id = req.body.id
  const categoria = await dbfind(`SELECT * FROM categorias`);
  cl = await dbfind(` DELETE comentslikes FROM comentslikes WHERE comment = ${id}`);
  c = await dbfind(`DELETE comments FROM comments WHERE id =  ${id}`); 
  res.json({ok:true})
})

module.exports = router;
