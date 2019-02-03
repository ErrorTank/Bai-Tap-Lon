const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");

const userSql = (db) => {
  const query = createQuery(db);
  const getUser = (userID) => {
    if(isNil(userID)){
      reject(new Error("Cannot find user with ID: " + userID));
    }else{
      const getInfo = `SELECT * FROM user where userID = '${userID}'`;
      return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("User not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }

  };
  return {
    getUser
  }
};
module.exports = userSql;
