const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

const cehckSession = (req,res,next) => {
  req.session = {ok:false};
  if(typeof req.cookies.session != 'undefined'){
    jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
      if(!err){
        req.session = {
          ok: true,
          id: decoded.id,
          username: decoded.username,
          picture: decoded.picture,
          class: decoded.class
        };
      }
    })
  };
  next()
}

const userArea = (req,res,next) =>{
 try {
  jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
    if(err) return res.redirect('/')
    ;
    next()
  });
 } catch (error) {
   res.redirect('/')
 }
}


module.exports = {
  cehckSession,
  userArea
}