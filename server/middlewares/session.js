const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

const cehckSession = (req,res,next) => {
  if(typeof req.cookies.session != 'undefined'){
    jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
      if(err) return next();
      req.session = true;
    })
  }
  next()
}


module.exports = {
  cehckSession
}