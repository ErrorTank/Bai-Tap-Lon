const {DBError} = require("../utils/error/error-types");


const createQuery = (db) => {
  return  (sql) => {
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, result) {
        if (err)
          reject(new DBError(err.message));
        else{
          resolve(result);
        }

      });
    });
  };
};

module.exports = createQuery;
