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

    var createInfo = `INSERT INTO User (userID, name, CMT, address, phone, email, accountID, employeeID, gender) VALUES('${userID}', '${name}', '${CMT}', '${address}, '${phone}', '${email}', '${accountID}', '${employeeID}', '${gender}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  return {
    getUser,
    updateUser,
    getUserByAccountID,
    createUser
  }
};
module.exports = userSql;
