const {DBError} = require("../utils/error/error-types");
const isNil = require("lodash/isNil");
const createQuery = require("../config/query");

const accountSql = (db) => {
  const query = createQuery(db);
  const checkLogin = ({username, password}) => {
    const checkExist = `SELECT * FROM account where username = '${username}'`;
    const checkCorrect = `SELECT * FROM ( ( SELECT * FROM ACCOUNT WHERE username = '${username}' AND PASSWORD = '${password}' ) AS a INNER JOIN( SELECT * FROM USER ) AS u ) WHERE a.accountID = u.accountID`;
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
  const getClientUserCache = (accountID) => {
    const sql = `SELECT * FROM ( ( SELECT * FROM ACCOUNT WHERE accountID = '${accountID}' ) AS a INNER JOIN( SELECT * FROM USER ) AS u ) WHERE a.accountID = u.accountID`;
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        if(result.length){
          resolve(result[0]);
        }else{
          reject(new Error("not_found"));
        }
      });
    })

  };
  const getAccount = (accountID) => {
    return new Promise((resolve, reject) => {
      if(isNil(accountID)){
        reject(new Error("Cannot find account with ID: " + accountID));
      }else{
        const getInfo = `SELECT * FROM account where accountID = '${accountID}'`;
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Account not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }

    });



  };
  const updateAccount = (accountID, accountObj) => {
    //
    let {email, username, password, role, canLogin} = accountObj;

    let updateInfo = `UPDATE account SET  email = '${email}', username = '${username}', password = '${password}', role = '${role}', canLogin = '${canLogin}' WHERE accountID = '${accountID}'`;
    return new Promise((resolve, reject) =>
      query(updateInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };
  return {
    checkLogin,
    updateAccount,
    getAccount,
    getClientUserCache
  }
};
module.exports = accountSql;
