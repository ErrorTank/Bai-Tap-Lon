const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");

const accountSql = (db) => {
  const query = createQuery(db);
  const checkLogin = ({username, password}) => {
    const checkExist = `SELECT * FROM account where username = '${username}'`;
    const checkCorrect = `SELECT * FROM account where username = '${username}' and password = '${password}'`;
    return new Promise((resolve, reject) =>
      query(checkExist).then((result) => {
            if(result.length){
              query(checkCorrect, "password_wrong")
                .then((data) => {
                  if(data.length)
                    resolve(data[0]);
                  else
                    reject(new Error("password_wrong"))
                })
                .catch(err => reject(err))
            }

            else
              reject(new Error("not_existed"));
        })
        .catch(err => {
          reject(err)
        }))
  };
  return {
    checkLogin
  }
};
module.exports = accountSql;
