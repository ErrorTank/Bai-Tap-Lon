const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const schoolSql = (db) => {
  const query = createQuery(db);

  //create location
  const getSchool = (schoolID) => {
    return new Promise((resolve, reject) => {
      if (isNil(schoolID)) {
        reject(new Error("Cannot find school with ID: " + schoolID));
      } else {
        const getInfo = `SELECT * FROM school where sID = '${schoolID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("school not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }

    });
  };
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

  //
  const getSchoolBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;
    const sql = `Select SQL_CALC_FOUND_ROWS * from school where ${keyword ? `(name like '%${keyword}%' or address like '%${keyword}%'  or email like '%${keyword}%')` : "1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({sps: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })
  };

  return {
    getSchool,
    getSchoolsBrief,
    checkCandidate,
    getSchoolBriefWithCondition
    //define function name here
  }
};
module.exports = schoolSql;
