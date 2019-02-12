const uniquid = require("uniquid");
const {DBError} = require("../utils/error/error-types");
const isNil = require("lodash/isNil");
const createQuery = require("../config/query");

const accountSql = (db) => {
  const query = createQuery(db);
  const checkLogin = ({username, password}) => {
    const checkExist = `SELECT * FROM Account where username = '${username}'`;
    const checkCorrect = `SELECT * FROM ( ( SELECT * FROM Account WHERE username = '${username}' AND PASSWORD = '${password}' ) AS a INNER JOIN( SELECT * FROM USER ) AS u ) WHERE a.accountID = u.accountID`;
    return new Promise((resolve, reject) =>
      query(checkExist).then((result) => {
        if (result.length) {
          query(checkCorrect, "password_wrong")
            .then((data) => {
              if (data.length) {
                data[0].canLogin ?
                resolve(data[0]) : reject(new Error("cannot_login"));
              }

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
        })
    )
  };

  const createAccount = (accountObj) => {
    var id = uniquid();
    var accountID = id.slice(-6, -1) + id.slice(-1);

    var {username, password, role, canLogin} = accountObj;

    var createInfo = `INSERT INTO account (accountID, username, password, role, canLogin) VALUES('${accountID}', '${username}', '${password}', '${role}', '${canLogin}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  const getClientUserCache = (accountID) => {
    const sql = `SELECT * FROM ( ( SELECT * FROM Account WHERE accountID = '${accountID}' ) AS a INNER JOIN( SELECT * FROM USER ) AS u ) WHERE a.accountID = u.accountID`;
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        if (result.length) {
          resolve(result[0]);
        } else {
          reject(new Error("account_not_found"));
        }
      }).catch(err => reject(err));
    })
  };

  const getAccount = (accountID) => {
    return new Promise((resolve, reject) => {
      if (isNil(accountID)) {
        reject(new Error("Cannot find account with ID: " + accountID));
      } else {
        const getInfo = `SELECT * FROM Account where accountID = '${accountID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("Account not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }

    });
  };

  //update account's info
  const updateAccount = (accountID, accountObj) => {
    let {username, password, role, canLogin} = accountObj;

    let updateInfo = `UPDATE Account SET username = '${username}', password = '${password}', role = '${role}', canLogin = '${canLogin}' WHERE accountID = '${accountID}'`;
    return new Promise((resolve, reject) =>
      query(updateInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };
  var q = {
    take: 0,
    skip: 50,
    keyword: "ccc",
    canLogin: false,
    role: 3
  };

  //get account by role
  const getAccountByRole = (Role) => {
    let getInfo = `SELECT * FROM Account WHERE role = '${Role}'`;
    return new Promise((resolve, reject) => {
      query(getInfo).then(result => {
        if (result.length) {
          resolve(result);
        } else {
          reject(new Error("not_found"));
        }
      }).catch(err => reject(err));
    })
  };

  //get account by canLogin
  const getAccountByCanLogin = (canLogin) => {
    let getInfo = `SELECT * FROM Account WHERE canLogin = '${canLogin}'`;
    return new Promise((resolve, reject) => {
      query(getInfo).then(result => {
        if (result.length) {
          resolve(result);
        } else {
          reject(new Error("not_found"));
        }
      }).catch(err => reject(err));
    })
  };

  return {
    checkLogin,
    createAccount,
    updateAccount,
    getAccount,
    getClientUserCache,
    getAccountByRole,
    getAccountByCanLogin
  }
};

module.exports = accountSql;

