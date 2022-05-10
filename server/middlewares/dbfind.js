const mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'root',
  database: 'pkmonkey'
});

function dbfind(sql){
  try {
    return new Promise(res => {
      con.query(sql, function (err, result) {
        if (err) res({ok:false, error: err})
        res({ok: true, res: result})
      });
    })
  } catch (error) {
    return {ok:false, error};
  }
}


module.exports = {
  dbfind
}