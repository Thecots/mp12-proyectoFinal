const express = require("express");
const router = express.Router();
const path = require('path');
const {cehckSession} = require('./../middlewares/session');

router.get('/', [cehckSession], (req, res) => {
  res.render("index");
})

router.use(require('./login.routes'))

/* 404 */
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/404/404.html'));
});

module.exports = router;
