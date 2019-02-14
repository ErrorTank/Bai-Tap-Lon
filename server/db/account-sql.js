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

    return new Promise((resolve, reject) => {
      query(createInfo).then((result) => {

        resolve(accountID);
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  };

  const getAccountBriefWithCondition = (obj) => {
    let {clientRole, orderAsc, orderBy, skip, take, role, canLogin, keyword} = obj;
    console.log(canLogin)
    let getSql = () => {
      let matcher = {
        0: `select accountID from (select u.accountID as accountID from user u where u.name like '%${keyword}%' or u.email like '%${keyword}%' union select c.accountID from candidate c where c.name like '%${keyword}%' or c.email like '%${keyword}%' union select sp.accountID from schoolpresenter sp where sp.name like '%${keyword}%' or sp.email like '%${keyword}%') fs`,
        1: `select accountID from (select c.accountID from candidate c where c.name like '%${keyword}%' or c.email like '%${keyword}%' union select sp.accountID from schoolpresenter sp where sp.name like '%${keyword}%' or sp.email like '%${keyword}%') fs`
      };
      return matcher[Number(clientRole)]
    };
    const sql = `Select * from account where ${clientRole === 1 ? "(role = 2 or role = 3)" : "1=1" } ${!isNil(canLogin) ? `and canLogin = '${Number(canLogin)}'` : "and 1=1"} ${!isNil(role) ? `and role = '${Number(role)}'` : "and 1=1"} ${keyword ? `and (username like '%${keyword}%' or accountID in (${getSql()}))` : "and 1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        resolve({accounts: result, total: result.length});
      }).catch(err => reject(err));
    })
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

  const checkAccountExisted = ({username}) => {
    const check = `Select * from account where username = '${username}'`;
    return new Promise((resolve, reject) => {
      query(check).then(result => {
        if (result.length) {
          reject(new Error("username_existed"));
        } else {
          resolve();
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

    return new Promise((resolve, reject) => {
      if(isNil(accountID)){
        reject(new Error("Cannot find account with ID: " + accountID));
      }else{

        let {username, password, role, canLogin} = accountObj;
        const checkExist = `SELECT username from account where not accountID = '${accountID}' and username = '${username}'`;
        let updateInfo = `UPDATE Account SET username = '${username}', password = '${password}', role = '${role}', canLogin = '${canLogin}' WHERE accountID = '${accountID}'`;
        query(checkExist).then((result) => {
          if(result && result.length){
            reject(new Error("username_existed"));
          }else{
            query(updateInfo).then(() => {
              resolve();
            }).catch(err => {
              reject(err)
            })
          }
        }).catch(err => reject(err));

      }

    });
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

<<<<<<< HEAD
  //account filter
  const accountFilter = (accountObj) => {
    let {take, skip , keyword, role, canLogin} = accountObj;
    if(keyword === '')
    {
      if(role === '')
        var sql = `SELECT * FROM account WHERE canLogin LIKE "%'${canLogin}'%"`;

      if(canLogin === '')
        var sql = `SELECT * FROM account WHERE role LIKE "%'${role}'%"`;

      else
      var sql = `SELECT * FROM account WHERE canLogin LIKE "%'${canLogin}'%" AND role LIKE "%'${role}'%"`;
    }

    if(role === '')
    {
      if(keyword === '')
        var sql = `SELECT * FROM account WHERE canLogin LIKE "%'${canLogin}'%"`;

      if(canLogin === '')
        var sql = `SELECT * FROM account WHERE username LIKE "%'${keyword}'%"`;

      else
      var sql = `SELECT * FROM account WHERE canLogin LIKE "%'${canLogin}'%" AND username LIKE "%'${keyword}'%"`;
    }

    if(canLogin === '')
    {
      if(keyword === '')
        var sql = `SELECT * FROM account WHERE role LIKE "%'${role}'%"`;

      if(role === '')
        var sql = `SELECT * FROM account WHERE username LIKE "%'${keyword}'%"`;

      else
      var sql = `SELECT * FROM account WHERE canLogin LIKE "%'${canLogin}'%" AND username LIKE "%'${keyword}'%"`;
    }

    else
      var sql = `SELECT * FROM account WHERE username LIKE "%'${keyword}'%" AND canLogin LIKE "%'${canLogin}'%" AND role LIKE "%'${role}'%"`;

    
  };
=======
  const deleteAccount = (accID) => {
    var deleteInfo = `DELETE FROM account WHERE accountID = '${accID}'`;
    return new Promise((resolve, reject) =>
      query(deleteInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

>>>>>>> 2307ab554941e9a220a5c8501f24ce94d7bf2ec5
  return {
    checkLogin,
    deleteAccount,
    createAccount,
    updateAccount,
    getAccount,
    getClientUserCache,
    getAccountByRole,
    getAccountByCanLogin,
    checkAccountExisted,
<<<<<<< HEAD
    accountFilter
=======
    getAccountBriefWithCondition
>>>>>>> 2307ab554941e9a220a5c8501f24ce94d7bf2ec5
  }
};

module.exports = accountSql;

