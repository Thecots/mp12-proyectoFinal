const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');
const { dbfind } = require('./dbfind');

const cehckSession = (req,res,next) => {
  req.session = {ok:false};
  if(typeof req.cookies.session != 'undefined'){
    jwt.verify(req.cookies.session, process.env.SEED, async(err, decoded) => {
      if(!err){
        sql = await dbfind(`select id from users where id = ${decoded.id}`)
        if(sql.res.length != 0){
          picture = await dbfind(`select picture from users where id = ${decoded.id}`)
          req.session = {
            ok: true,
            id: decoded.id,
            username: decoded.username,
            picture:picture.res[0].picture,
            class: decoded.class
          };
        }   
        next()
      }else{
        next()
      }
    })
  }else{
    next()
  }
  
}

const userArea = (req,res,next) =>{
 try {
  jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
    if(err) return res.redirect('/')
    
    next()
  });
 } catch (error) {
   res.redirect('/')
 }
}



/* (null,3,'DiEgoSnNiPeR16','$2b$10$yf3AxBwDGpKF09Ngr6z2tuN.J7tKAJoC8SUS77UCuBjPhxtBd.frK','/img/defaultuser.png'); */




/* 
for(let i = 0; i < nicknames.length; i++){
  console.log(`(3,'${nicknames[i].replace( /\s/g, '')}','$2b$10$P8zGhlo4gM0XbGwVWqXPs.1cX4sY0WdiNofAJQKG4Dhiw/vOC1I1S'),`);
} */


module.exports = {
  cehckSession,
  userArea
}