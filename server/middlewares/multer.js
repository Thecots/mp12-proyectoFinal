const multer = require('multer');
const path = require('path');

function upload(){
  const storage = multer.diskStorage({
    destination:  path.join(__dirname,'../public/img/temp'),
    filename: function (req, file, cb) {
      cb(null,Date.now()+path.extname(file.originalname))
    }
  })
  return upload = multer({storage}).single('img')
}


module.exports = upload