const {cehckSession, userArea, adminAreaPost} = require('./../../middlewares/session');
const { dbfind } = require("../../middlewares/dbfind");
const express = require("express");
const path = require('path');
const router = express.Router();
const upload = require('../../middlewares/multer');
const fs = require('fs');

/* cloudinary */
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CYNAME,
  api_key: process.env.CYAPIKEY,
  api_secret: process.env.CYAPISECRET
})

/* crear categoria */
router.post("/newCategory", [cehckSession,userArea, adminAreaPost], async(req,res) => {
  c = await dbfind(`INSERT INTO categorias(categoria) VALUES('${req.body.categoria}')`);
  if(c.ok) res.json({ok:true, cat:req.body.categoria})
  else res.json({ok:true}) 
});

/* crear foro */
router.post('/createforo',[cehckSession,userArea, adminAreaPost, upload()], async (req,res) => {
  const data = JSON.parse(req.body.data)
  
  try {
    const imgc = await cloudinary.v2.uploader.upload(req.file.path);
    const sql = await dbfind(`INSERT INTO foros VALUES (null,'${data.name}','${data.description}','${imgc.url}','${imgc.public_id}', '${data.fondo}', ${parseInt(data.categoria)})`)
    fs.unlink(path.join(__dirname,`../public/img/temp/${req.file.filename}`), function(err) {
      if (err) console.log('error, img no deleted');});
    res.json({ok:true})
  } catch (error) {
    res.json({ok:false})
  }
})

module.exports = router;
