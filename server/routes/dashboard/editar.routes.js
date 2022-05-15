const {cehckSession, userArea, adminAreaPost} = require('./../../middlewares/session');
const { dbfind } = require("../../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();
const upload = require('../../middlewares/multer');
const fs = require('fs');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CYNAME,
  api_key: process.env.CYAPIKEY,
  api_secret: process.env.CYAPISECRET
})


/* editar usuario */
router.post('/editarUser', [cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const users = await dbfind(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  if(users.res.length == 0 || users.res[0].id == req.body.id){

    const admin = req.body.admin == true ? 2 : 3 ;
    if(req.body.deletefoto ){
      try {
        await cloudinary.v2.uploader.destroy(users.res[0].pictureid);
      } catch (error) { }
      users2 = await dbfind(`UPDATE users SET username = '${req.body.username}', class = ${admin} , picture = '/img/defaultuser.png', pictureid = NULL WHERE id = ${req.body.id}`) 
    }else{
      users2 = await dbfind(`UPDATE users SET username = '${req.body.username}', class = ${admin} WHERE id = ${req.body.id}`) 
    }

    res.json({ok:true, username:req.body.username, admin: req.body.admin, foto: req.body.deletefoto, id: req.body.id })
  }else{
    res.json({ok:false})
  }
})

/* editar categoria */
router.post('/editarCategoria', [cehckSession,userArea, adminAreaPost], async(req,res) => { 
  const users = await dbfind(`SELECT * FROM categorias WHERE categoria = '${req.body.categoria}'`)
  if(users.res.length == 0 || users.res[0].id == req.body.id){
    const users2 = await dbfind(`UPDATE categorias SET categoria = '${req.body.categoria}' WHERE id = ${req.body.id}`)
    res.json({ok:true,categoria:req.body.categoria})
  }else res.json({ok:false})
  
  
});

/* editar foro */
router.post('/editarForo' , [cehckSession,userArea, adminAreaPost, upload()], async(req,res) => {
  const data = JSON.parse(req.body.data)
  const foro =  await dbfind(`SELECT * FROM foros WHERE id = ${data.id} `)
  if(req.file == undefined){ 
    sql = await dbfind(`UPDATE foros SET name = '${data.name}', description = '${data.description}', color = '${data.fondo}', categoria = ${parseInt(data.categoria)} WHERE id = ${data.id} `)
  }else{
    if(foro.res[0].imageid != null){
      try {
        await cloudinary.v2.uploader.destroy(foro.res[0].imageid); 
      } catch (error) {      
      }
    }
    const imgc = await cloudinary.v2.uploader.upload(req.file.path);
    fs.unlink(path.join(__dirname,`../public/img/temp/${req.file.filename}`), function(err) {
      if (err) console.log('error, img no deleted :(');});
    sql = await dbfind(`UPDATE foros SET name = '${data.name}', description = '${data.description}', color = '${data.fondo}', categoria = ${parseInt(data.categoria)} ,image = '${imgc.url}', imageid = '${imgc.public_id}' WHERE id = ${data.id} `)
  }
  
  res.json({ok: true})
})

module.exports = router;
