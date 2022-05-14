const {cehckSession, userArea, adminArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const express = require("express");
const router = express.Router();
const moment = require('moment');

/* cloudinary */
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CYNAME,
  api_key: process.env.CYAPIKEY,
  api_secret: process.env.CYAPISECRET
})


/* dashboard home page */
router.get('/dashboard',[cehckSession,userArea, adminArea], async(req,res) => {
  /* consultas */
  const date = new Date();
  const users = await dbfind('SELECT count(id) as users FROM users')
  const posts = await dbfind('SELECT count(id) as posts from posts')
  const comments = await dbfind('SELECT count(id) as comments from comments')
  const likesp = await dbfind('SELECT count(id) as likes from postslikes')
  const likesc = await dbfind('SELECT count(id) as likes from comentslikes')
  const likes = likesp.res[0].likes+likesc.res[0].likes;
  const usersres = await dbfind(`SELECT COUNT(id) as users FROM users WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.getFullYear()}`);
  const postsres = await dbfind(`SELECT COUNT(id) as posts FROM posts WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.getFullYear()}`);
  const commentsres = await dbfind(`SELECT COUNT(id) as comments FROM comments WHERE MONTH(created) = ${date.getMonth()+1} AND YEAR(created) = ${date.getFullYear()}`);

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

/* dashboard usuarios */
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

/* dashboard categorias */
router.get('/dashboard/categorias',[cehckSession,userArea, adminArea], async(req,res) => { 
  const categorias = await dbfind(`SELECT categorias.*, (SELECT count(*) FROM foros WHERE foros.categoria = categorias.id) as foros FROM categorias`);
  res.render('dashboardCategorias',{
    session: req.session,
    dashboard: true,
    cat: categorias.res
    })
});

/* dashboard foro */
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

/* dashboard posts */
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

/* dashboard comentarios */
router.get('/dashboard/comentarios', [cehckSession,userArea, adminArea],  async (req,res) => {
  sql = await dbfind(`SELECT comments.*, p.title, p.foro, f.name , f.categoria, u.username FROM comments LEFT JOIN posts as p ON p.id = comments.post LEFT JOIN foros as f ON f.id = p.foro LEFT JOIN users as u ON u.id = comments.user;`);
  res.render('dashboardComments',{
    session: req.session,
    dashboard: true,
    comments: sql.res
    })
});

/* obtener categorias */
router.post('/getCategorias', [cehckSession,userArea, adminArea],  async (req,res) => {
  const categoria = await dbfind(`SELECT * FROM categorias`);
  res.json({cat: categoria.res})
})

router.use(require('./dashboard/crear.routes'))
router.use(require('./dashboard/editar.routes'))
router.use(require('./dashboard/eliminar.routes'))

module.exports = router;
