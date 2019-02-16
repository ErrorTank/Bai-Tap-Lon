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

  const checkSchoolExisted = ({email}) => {
    const check = `Select * from school where email = '${email}' `;
    return new Promise((resolve, reject) => {
      query(check).then(result => {
        if (result.length) {
          reject(new Error("email_existed"));
        } else {
          resolve();
        }
      }).catch(err => reject(err));
    })
  };

  const createSchool = (school) => {
    //generate random ID for location
    var id = uniquid();
    var sID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {name, email, address, phone} = school;

    var createInfo = `INSERT INTO school (sID, name, email, address, phone) VALUES ('${sID}', '${name}','${email}', '${address}', '${phone}')`;
    var getItem = `select * from school where email = '${email}'`;
    return new Promise((resolve, reject) =>
      query(createInfo).then(() => {
        query(getItem).then((result) => {

          resolve(result[0]);
        }).catch(err => reject(err));

      }).catch(err => {
        reject(err)
      })
    )
  };

  //
  const updateSchool = (sID, school) => {
    return new Promise((resolve, reject) => {
      if(isNil(sID)){
        reject(new Error("Cannot find school with ID: " + sID));
      }else{

        let {name,  address, phone, email}  = school;
        const checkExist = `SELECT email from school where not sID = '${sID}' and email = '${email}'`;
        const getInfo = `UPDATE school SET name = '${name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE sID = '${sID}'`;
        query(checkExist).then((result) => {
          if(result && result.length){
            reject(new Error("email_existed"));
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

  const getSchoolBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;
    const sql = `Select SQL_CALC_FOUND_ROWS * from school where ${keyword ? `(name like '%${keyword}%' or address like '%${keyword}%'  or email like '%${keyword}%')` : "1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({schools: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })
  };

  const deleteSchool = (sID) => {
    var deleteInfo = `DELETE FROM school WHERE sID = '${sID}'`;
    return new Promise((resolve, reject) =>
      query(deleteInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  return {
    updateSchool,
    createSchool,
    getSchool,
    getSchoolsBrief,
    checkCandidate,
    getSchoolBriefWithCondition,
    checkSchoolExisted,
    deleteSchool
    //define function name here
  }
};
module.exports = schoolSql;
