const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const schoolSql = (db) => {
  const query = createQuery(db);

  //create location

  const getSchoolsBrief = () => {
    let getInfo = `SELECT sID, name, address FROM school`;
    return new Promise((resolve, reject) =>
      query(getInfo).then((result) => {
        if(result.length){
          resolve(result);
        }else{
          reject(new Error("Empty school"));
        }
      }).catch(err => {
        reject(err)
      })
    )
  };




  return {

    getSchoolsBrief,

    //define function name here
  }
};
module.exports = schoolSql;
