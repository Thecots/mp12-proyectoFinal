const {cehckSession, userArea, adminAreaPost} = require('./../../middlewares/session');
const { dbfind } = require("../../middlewares/dbfind");
const express = require("express");
const router = express.Router();

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CYNAME,
  api_key: process.env.CYAPIKEY,
  api_secret: process.env.CYAPISECRET
})


/* eliminar usuario */
router.post('/deleteUser',[cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const id = req.body.id;
  
  const usr = await dbfind(`SELECT pictureid as id FROM users WHERE id = ${id}`) 
  if(usr.res[0].id != null){
    await cloudinary.v2.uploader.destroy(usr.res[0].id);
  }

  /* likes en comentarios que le han dado */
  const userCommentsLikes = await dbfind(`DELETE comentslikes FROM comentslikes LEFT JOIN comments as c ON c.id = comentslikes.comment WHERE c.user = ${id}`);
  /* likes en comentarios que ha dado*/
  const thisUserCommentLikes = await dbfind(`DELETE comentslikes FROM comentslikes WHERE user = ${id}`);
  /* likes en posts que ha dado */
  const thispostLikes = await dbfind(`DELETE postslikes FROM postslikes WHERE user = ${id}`);
  /* likes en posts que le han dado */
  const userpostLikes = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts as p ON p.id = postslikes.post WHERE p.user = ${id}`);
  /* comentarios del usuario */
  const thisUserComments = await dbfind(`DELETE comments FROM comments WHERE user = ${id}`);   
  /* likes de los comentarios de los posts del usuario */  
  const postLikes = await dbfind(`DELETE comentslikes FROM comentslikes LEFT JOIN comments as c ON c.id = comentslikes.comment LEFT JOIN posts as p ON p.id = c.post WHERE p.user = ${id};`)
  /* comentarios que le han echo */
  const userPostComments = await dbfind(`DELETE comments  FROM comments LEFT JOIN posts as p ON p.id = comments.post WHERE p.user = ${id}`); 
  /* comentarios del post del usuario */
  const commentsLikes = await dbfind(`DELETE comments FROM comments LEFT JOIN posts as p ON p.id = comments.post WHERE p.user = ${id}`)
  /* posts del usuario */
  const posts = await dbfind(`DELETE posts FROM posts WHERE user = ${id}`);
  /* usuario completo */
  const user = await dbfind(`DELETE users FROM users WHERE id = ${id}`);

  if(
    userCommentsLikes.ok &&
    thisUserCommentLikes.ok &&
    thispostLikes.ok &&
    thisUserComments.ok &&
    userPostComments &&
    commentsLikes &&
    postLikes &&
    userpostLikes &&
    posts.ok &&
    user.ok
  ) return res.json({ok:true})
  
  res.json({ok:false})
});

/* eliminar post */
router.post('/deletePost',[cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const id = req.body.id;
  /* likes en comentarios */
  const commentsLikes = await dbfind(`DELETE comentslikes FROM comentslikes LEFT JOIN comments ON comentslikes.comment = comments.id LEFT JOIN posts ON posts.id = comments.post WHERE posts.id = ${id}`);
  /* likes en posts */
  const postLikes = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post WHERE posts.id = ${id}`);
  /* comentarios */
  const comments = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post WHERE posts.id = ${id}`);   
  /* posts */
  const posts = await dbfind(`DELETE posts FROM posts WHERE id = ${id}`);

  if(
    commentsLikes.ok&&
    postLikes.ok &&
    comments.ok &&
    posts.ok
  ) return res.json({ok:true})

  res.json({ok:false})
});


/* eliminar categoria */
router.post('/deleteCategoria',[cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const id = req.body.id;

  const sql = await dbfind(`SELECT f.imageid FROM categorias LEFT JOIN foros as f ON f.categoria = categorias.id WHERE categorias.id = ${id}`)
  sql.res.forEach(async (n) => {
    try {
      await cloudinary.v2.uploader.destroy(n.imageid);
    } catch (error) { }
  });

   /* likes en comentarios */
  const commentLikes = await dbfind(`
    DELETE comentslikes FROM comentslikes
    LEFT JOIN comments ON comentslikes.comment = comments.id
    LEFT JOIN posts ON posts.id = comments.post
    LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);
  /* likes en posts */
  const postLikes = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);
  /* comentarios */
  const comments = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria =  ${id}`); 
  /* posts */
  const posts = await dbfind(`DELETE posts FROM posts LEFT JOIN foros ON foros.id = posts.foro WHERE foros.categoria = ${id}`);
  /* foros */
  const foro = await dbfind(`DELETE foros FROM foros WHERE categoria = ${id}`);
  /* categoria */
  const category = await dbfind(`DELETE categorias FROM categorias WHERE id = ${id}`);

  if(
    commentLikes.ok &&
    postLikes.ok &&
    comments.ok &&
    posts.ok &&
    foro.ok &&
    category.ok
  ) return res.json({ok:true})
    
  res.json({ok:false})
});


/* eliminar foro */
router.post('/deleteForo',[cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const id = req.body.id;
  
  const sql = await dbfind(`SELECT * FROM foros WHERE id = ${id}`);
  if(sql.res[0].imageid != null){
    await cloudinary.v2.uploader.destroy(sql.res[0].imageid);
  }

  /* likes en comentarios */
  const commentLikes = await dbfind(`
    DELETE comentslikes FROM comentslikes
    LEFT JOIN comments ON comentslikes.comment = comments.id
    LEFT JOIN posts ON posts.id = comments.post
    LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* likes en posts */
  const postLikes = await dbfind(`DELETE postslikes FROM postslikes LEFT JOIN posts ON posts.id = postslikes.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* comentarios */
  const comments = await dbfind(`DELETE comments FROM comments LEFT JOIN posts ON posts.id = comments.post LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id =  ${id}`); 
  /* posts */
  const posts = await dbfind(`DELETE posts FROM posts LEFT JOIN foros ON foros.id = posts.foro WHERE foros.id = ${id}`);
  /* foros */
  const foro = await dbfind(`DELETE foros FROM foros WHERE id = ${id}`);

  if(
    commentLikes.ok &&
    postLikes.ok &&
    comments.ok &&
    posts.ok &&
    foro.ok
  ) return res.json({ok:true})
  
  res.json({ok:false})
});

/* eliminar comentarios */
router.post('/deleteComment' , [cehckSession,userArea, adminAreaPost],  async (req,res) => {
  id = req.body.id
  const categoria = await dbfind(`SELECT * FROM categorias`);
  commentLikes = await dbfind(` DELETE comentslikes FROM comentslikes WHERE comment = ${id}`);
  comment = await dbfind(`DELETE comments FROM comments WHERE id =  ${id}`); 

  if(
    commentLikes.ok &&
    comment.ok
  ) return res.json({ok:true})

  res.json({ok:false})
})

module.exports = router;
