const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const prizeSql = (db) => {
  const query = createQuery(db);
  //create prize
  const createPrize = (prizeObj) => {
    //create random ID for prize
    var id = uniquid();
    this.prizeID = id.slice(-6,-1)+id.slice(-1);

    //
    var {name, address} = prizeObj;

    var createInfo = `INSERT INTO orgLocation (prizeID, name, content) VALUES('${prizeID}', '${name}', '${content}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getPrize = (prizeID) => {
    var getInfo = `SELECT * FROM prize WHERE prizeID = ${prizeID}`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Prize not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  };

  //update location's info
  const updatePrize = (prizeID, prizeObj) => {
    //
    var {name, address} = prizeObj;

    var updateInfo = `UPDATE prize SET name = ${name}, content = ${content} WHERE prizeID = ${prizeID}`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deletePrize = (prizeID) => {
    var deleteInfo = `DELETE FROM prize WHERE prizeID = ${prizeID}`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createPrize,
    getPrize,
    updatePrize,
    deletePrize
    //define function name here
  }
};
module.exports = prizeSql;
