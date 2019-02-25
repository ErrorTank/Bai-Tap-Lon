const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const supervisorSql = (db) => {
  const query = createQuery(db);

  //create location
  const createRc = (obj) => {
    //generate random ID for location
    var id = uniquid();
    var rcID = id.slice(-6, -1) + id.slice(-1);

    //destruct object for further use
    var {address, sID, name, phone, email, contestID, CMT, gender, username, password, dob} = obj;

    var createInfo = `INSERT INTO registrationcandidate (rcID, address, sID, name, phone, email, contestID, CMT, gender, username, password, dob) VALUES ('${rcID}', '${address}', '${sID}','${name}','${phone}','${email}','${contestID}','${CMT}','${gender}','${username}','${password}','${dob}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve(rcID);
      }).catch(err => {
        reject(err)
      })
    )
  };

  //get location
  const getRc = (rcID) => {
    return new Promise((resolve, reject) => {
      if (isNil(rcID)) {
        reject(new Error("Cannot find rc with ID: " + rcID));
      } else {
        const getInfo = `SELECT *, DATE_FORMAT(dob, "%Y-%m-%d") as dob FROM registrationcandidate where rcID = '${rcID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("rc not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };

  const updateRc = (rcID, rcObj) => {
    return new Promise((resolve, reject) => {
      if (isNil(rcID)) {
        reject(new Error("Cannot find rc with ID: " + rcID));
      } else {

        var {address, name, phone, email, contestID, CMT, gender, username, password, dob} = rcObj;

        const getInfo = `UPDATE registrationcandidate SET  name = '${name}', email = '${email}', phone = '${phone}', address = '${address}', name = '${name}',contestID = '${contestID}',CMT = '${CMT}',gender = '${gender}',username = '${username}',password = '${password}',dob = '${dob}' WHERE rcID = '${rcID}'`;

        query(getInfo).then(() => {
          resolve();
        }).catch(err => {
          reject(err)
        })

      }

    });
  };


  const getRcBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy, gender, sID} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS *, DATE_FORMAT(dob, "%Y-%m-%d") as dob  from registrationcandidate where ${!isNil(sID) ? `sID = '${sID}'` : "1=1"}  ${keyword ? `(and name like '%${keyword}%' or email  like '%${keyword}%' or phone like '%${keyword}%' or rcID = '${keyword}') ` : "and 1=1"} ${!isNil(gender) ? `and gender = '${Number(gender)}'` : "and 1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({rcs: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };

  const checkSupervisorExisted = ({email}) => {
    const check = `Select * from rc where email = '${email}' `;
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

  //delete location
  const deleteRc = (rcID) => {

    var deleteInfo = `DELETE FROM registrationcandidate WHERE rcID = '${rcID}'`;
    return new Promise((resolve, reject) => {
        query(deleteInfo).then((result) => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }
    )
  };
  const getSupervisorsBrief = () => {
    let getInfo = `SELECT * FROM supervisor`;
    return new Promise((resolve, reject) =>
      query(getInfo).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    )
  };

  const checkRcExisted = (rcID, sID) => {
    let getInfo = `SELECT * FROM registrationcandidate where rcID = '${rcID}' and sID = '${sID}'`;
    return new Promise((resolve, reject) =>
      query(getInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  const createCandidateInstance = (data) => {
    let {address, sID, name, phone, email, contestID, CMT, gender, username, password, dob} = data;
    let id1 = uniquid();
    let accountID = id1.slice(-6, -1) + id1.slice(-1);
    let id2 = uniquid();
    let cID = id2.slice(-6, -1) + id2.slice(-1);
    let promises = [query(`INSERT INTO candidate (cID, accountID, sID, name, phone, email, dob, CMT, address, gender) VALUES('${cID}', '${accountID}', '${sID}', '${name}', '${phone}','${email}', '${dob}', '${CMT}', '${address}', '${gender}')`), query(`INSERT INTO account (accountID, username, password, role, canLogin) VALUES('${accountID}', '${username}', '${password}', '${3}', '${1}')`),query()];
  };

  return {
    createRc,
    getRc,
    updateRc,
    checkSupervisorExisted,
    getRcBriefWithCondition,
    getSupervisorsBrief,
    checkRcExisted,
    deleteRc,
    createCandidateInstance
    //define function name here
  }
};
module.exports = supervisorSql;
