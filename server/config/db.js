const mysql = require("mysql");

const config = {
  host: 'localhost',
  user: 'kappa',
  password: '123456',
  database: 'olympic',
  connectionLimit : 10
};


module.exports = () => new Promise((resolve, reject) => {
  const pool = mysql.createPool(config);
  pool.getConnection((err, connection) => {
    if (err) {
      reject(err);
    }else{
      console.log("You are now connected!");
      resolve(connection);
    }

  })
});






