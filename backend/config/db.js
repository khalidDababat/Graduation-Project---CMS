const mysql = require('mysql2/promise');
// const util = require('util');

// require('dotenv').config();



// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database:"cmsdb"
// });


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cmsdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.query = util.promisify(con.query);

pool.getConnection()
  .then(connection => {
    console.log(" Database connected successfully!");
    connection.release(); 
  })
  .catch(err => {
    console.error(" Database connection failed:", err.message);
  });

module.exports = pool;
// module.exports = con.promise();

