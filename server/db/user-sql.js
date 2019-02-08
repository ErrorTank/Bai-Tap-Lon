const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");

const userSql = (db) => {
  const query = createQuery(db);
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
  const updateUser = (userID, user) => {
    return new Promise((resolve, reject) => {
      if(isNil(userID)){
        reject(new Error("Cannot find user with ID: " + userID));
      }else{
        let {name, gender, address, phone, email, CMT}  = user;
        const getInfo = `UPDATE user SET name = '${name}', email = '${email}', phone = '${phone}', gender = '${gender}', address = '${address}', CMT = '${CMT}' WHERE userID = '${userID}'`;
        query(getInfo).then(() => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }

    });
  };

  return {
    getUser,
    updateUser
  }
};
module.exports = userSql;
