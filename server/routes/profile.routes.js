const {cehckSession, userArea} = require('./../middlewares/session');
const { dbfind } = require("../middlewares/dbfind");
const upload = require("../middlewares/multer");
const express = require("express");
const moment = require('moment');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dqaomwude',
  api_key: '642551195527337',
  api_secret: 'y-UkdiFtaT4IbChRWlE8RtR5OQk'
})

/* GET - perfil + comentarios */
router.get('/profile/:id/comentarios', [cehckSession], async (req,res) => {
  sql = await dbfind(`SELECT id,username,picture,created FROM users WHERE id='${req.params.id}'`)
  if(sql.res.length == 0) return res.redirect('/');
  sql.res[0].created = `${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','noviembre','Diciembre'][moment(sql.res[0].created,'YYYY/MM/DD').format('M')-1]} ${moment(sql.res[0].created,'YYYY/MM/DD').format('D')}, ${moment(sql.res[0].created,'YYYY/MM/DD').format('YYYY')}`

  userPosts = await dbfind(`SELECT count(id) as x FROM posts WHERE user = ${req.params.id}`);
  usercomments = await dbfind(`SELECT count(id) as x FROM comments WHERE user = ${req.params.id}`);

  recivedLikes = 0;
  comments = await dbfind(`
  SELECT
  comments.coment as comment,
  posts.id as postid,
  posts.title as title,
  comments.created,
  posts.foro as foroid,
  (SELECT count(*) FROM comentslikes WHERE comentslikes.comment = comments.id) as likes
  from comments
  LEFT JOIN posts on posts.id = comments.post
  WHERE comments.user =  ${req.params.id}
  ORDER BY comments.created DESC
  `);
  if(comments.res.length >= 1){
    comments.res.map(n => {
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
  }
  res.render("perfil",{
    profile: true,
    session: req.session,
    data: sql.res[0],
    comments: comments.res,
    userPosts: userPosts.res[0].x,
    usercomments: usercomments.res[0].x,
    recivedLikes: recivedLikes,
    headeractive: 'comentarios'
  });
})


/* GET - perfil + temas */
router.get('/profile/:id/temas', [cehckSession], async (req,res) => {
  sql = await dbfind(`SELECT class,id,username,picture,created FROM users WHERE id='${req.params.id}'`)
  if(sql.res.length == 0) return res.redirect('/');
  sql.res[0].created = `${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','noviembre','Diciembre'][moment(sql.res[0].created,'YYYY/MM/DD').format('M')-1]} ${moment(sql.res[0].created,'YYYY/MM/DD').format('D')}, ${moment(sql.res[0].created,'YYYY/MM/DD').format('YYYY')}`

  userPosts = await dbfind(`SELECT count(id) as x FROM posts WHERE user = ${req.params.id}`);
  usercomments = await dbfind(`SELECT count(id) as x FROM comments WHERE user = ${req.params.id}`);

  
  recivedLikes = 0;

  posts = await dbfind(`
  SELECT
  posts.id id,
  posts.title,
  u.picture picture,
  u.username creatorUsername,
  posts.user creatorId,
  posts.foro foroid,
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
  WHERE posts.user = ${req.params.id}
  GROUP BY posts.id
  ORDER BY posts.created DESC
  `);
  if(posts.res.length >= 1){
    posts.res.map(n => {
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
  res.render("perfil",{
    profile: true,
    session: req.session,
    data: sql.res[0],
    posts: posts.res,
    userPosts: userPosts.res[0].x,
    usercomments: usercomments.res[0].x,
    recivedLikes: recivedLikes,
    headeractive: 'temas'
  });
})



/* POST - user update image */
router.post('/profile/image/', [cehckSession,userArea,upload()] , async(req,res) => {
  try {
    let chim = await dbfind(`select pictureid from users where id=${req.session.id}`)
    if(chim.res[0].pictureid != null){
      await cloudinary.v2.uploader.destroy(chim.res[0].pictureid);
    }
    const imgc = await cloudinary.v2.uploader.upload(req.file.path);
    const sql = await dbfind(`UPDATE users SET picture = '${imgc.url}', pictureid = '${imgc.public_id}' WHERE id = ${req.session.id}`)
    fs.unlink(path.join(__dirname,`../public/img/temp/${req.file.filename}`), function(err) {
      if (err) console.log('error, img no deleted :(');});
    res.json({ok:true})
  } catch (error) {
    res.json({ok:false})
  }
})

module.exports = router;
