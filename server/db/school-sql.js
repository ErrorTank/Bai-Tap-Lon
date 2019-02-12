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

  const checkCandidate = (sID, cID) => {
    let checker = `SELECT cID, accountID, sID, name, phone, email, DATE_FORMAT(dob, "%Y-%m-%d") as dob, CMT, address, gender from candidate  where cID = '${cID}' and sID='${sID}'`;
    return new Promise((resolve, reject) =>
      query(checker).then((result) => {
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
    checkCandidate
    //define function name here
  }
};
module.exports = schoolSql;
