const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const userSql = (db) => {
  const query = createQuery(db);

  //get user
  const getUser = (userID) => {
    return new Promise((resolve, reject) => {
      if(isNil(userID)){
        reject(new Error("Cannot find user with ID: " + userID));
      }else{
        const getInfo = `SELECT * FROM user where userID = '${userID}'`;
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("User not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };

  //get user by account id
  const getUserByAccountID = (accountID) => {
    const sql = `SELECT * from user where accountID = '${accountID}'`;
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        if(result.length){
          resolve(result[0]);
        }else{
          reject(new Error("not_found"));
        }
      }).catch(err => reject(err));
    })
  };


  const checkUserExisted = ({email, CMT, employeeID}) => {
    const check = `Select * from user where email = '${email}' or CMT = '${CMT}' or employeeID = '${employeeID}'`;
    return new Promise((resolve, reject) => {
      query(check).then(result => {
        if (result.length) {
          let msg = result[0].email === email ? "email_existed" : result[0].employeeID ? "employeeID_existed" :"CMT_existed";
          reject(new Error(msg));
        } else {
          resolve();
        }
      }).catch(err => reject(err));
    })
  };

  //update user
  const updateUser = (userID, user) => {
    return new Promise((resolve, reject) => {
      if(isNil(userID)){
        reject(new Error("Cannot find user with ID: " + userID));
      }else{

        let {name, gender, address, phone, email, CMT}  = user;
        const checkExist = `SELECT email from user where not userID = '${userID}' and (email = '${email}' or CMT = '${CMT}')`;
        const getInfo = `UPDATE user SET name = '${name}', email = '${email}', phone = '${phone}', gender = '${gender}', address = '${address}', CMT = '${CMT}' WHERE userID = '${userID}'`;
        query(checkExist).then((result) => {
          if(result && result.length){
            let msg = result[0].email === email ? "email_existed" : "CMT_existed";
            reject(new Error(msg));
          }else{
            query(getInfo).then(() => {
              resolve();
            }).catch(err => {
              reject(err)
            })
          }
        }).catch(err => reject(err));

      }

    });
  };

  //create user
  const createUser = (userObj) => {
    //generate random ID for location
    var id = uniquid();
    var userID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {name, CMT, address, phone, email, accountID, employeeID, gender} = userObj;

    var createInfo = `INSERT INTO User (userID, name, CMT, address, phone, email, accountID, employeeID, gender) VALUES ('${userID}', '${name}', '${CMT}', '${address}', '${phone}', '${email}', '${accountID}', '${employeeID}', ${gender})`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
            reject(err)
        })
      )
  };
  const deleteUser = (uID) => {
    var deleteInfo = `DELETE FROM user WHERE userID = '${uID}'`;
    return new Promise((resolve, reject) =>
      query(deleteInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };


  //
  const getUserBriefWithCondition = (obj) => {
    console.log("Dasdas")
    let {keyword, skip, take, orderAsc, orderBy, accountType} = obj;
    let getSql = () => {
      let matcher = {
        0: `select accountID from account where role = 0`,
        1: `select accountID from account where role = 1`
      };
      return matcher[Number(accountType)]
    };
    const sql = `Select  SQL_CALC_FOUND_ROWS * from user where ${!isNil(accountType) ? `accountID in (${getSql()})` : "1=1" } ${keyword ? `and (name like '%${keyword}%' or email  like '%${keyword}%' or userID = '${keyword}')` : "and 1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({users: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };

  return {
    getUser,
    updateUser,
    getUserByAccountID,
    createUser,
    checkUserExisted,
    deleteUser,
    getUserBriefWithCondition
  }
};
module.exports = userSql;
