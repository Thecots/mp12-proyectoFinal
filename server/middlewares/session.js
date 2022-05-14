const jwt = require('jsonwebtoken');
const { dbfind } = require('./dbfind');

/* [GET] check if session is on or off */
const cehckSession = (req,res,next) => {
  req.session = {ok:false};
  if(typeof req.cookies.session != 'undefined'){
    jwt.verify(req.cookies.session, process.env.JWTSEED, async(err, decoded) => {
      if(!err){
        sql = await dbfind(`select id from users where id = ${decoded.id}`)
        if(sql.ok && sql.res.length != 0){
          picture = await dbfind(`select picture, username, class from users where id = ${decoded.id}`)
          req.session = {
            ok: true,
            id: decoded.id,
            username: picture.res[0].username,
            picture:picture.res[0].picture,
            class: picture.res[0].class
          };
        }   
        next()
      }else next()
    })
  }else next()
   
}

/* [GET] user area security */
const userArea = (req,res,next) =>{
 try {
  jwt.verify(req.cookies.session, process.env.JWTSEED, (err, decoded) => {
    if(err) return res.redirect('/')
    next()
  });
 } catch (error) {
   res.redirect('/')
 }
}

/* [GET] admin area security */
const adminArea = (req,res,next) => {
  try {
    if(req.session.class == 1 || req.session.class == 2){
      return next();
    }
    res.redirect('/')
 } catch (error) {
  res.redirect('/')
 }
}

/* [GET] editar perfil security */
const profileArea = (req,res,next) => {
  if(req.params.id == req.session.id) next()
  else res.redirect('/')
  
}

/* [POST] editar perfil security */
const profileArePost = (req,res,next) => {
  if(req.params.id == req.session.id) next()
  else res.redirect('/')
  
}


/* [POST] admin security */
const adminAreaPost = (req,res,next) => {
  try {
      if(req.session.class == 1 || req.session.class == 2){
        return next();
      }
      res.json({ok:false})
   } catch (error) {
    res.json({ok:false})
   }
}


module.exports = {
  cehckSession,
  userArea,
  adminArea,
  profileArea,
  adminAreaPost,
  profileArePost
}