var mysql = require('mysql2');

// require('dotenv').config();



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"cmsdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = con.promise();

