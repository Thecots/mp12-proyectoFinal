const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

const cehckSession = (req,res,next) => {
  req.session = {ok:false};
  if(typeof req.cookies.session != 'undefined'){
    jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
      if(err) return next();
      req.session = {
        ok: true,
        username: decoded.username,
        picture: decoded.picture,
        class: decoded.class
      };
    })
  }
  next()
}


module.exports = {
  cehckSession
}