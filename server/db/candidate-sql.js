const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const candidateSql = (db) => {
  const query = createQuery(db);

  //create location
  const createCandidate = (candidateObj) => {
    //generate random ID for location
    var id = uniquid();
    var cID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {accountID, sID, name, phone, email, dob, CMT, address, gender} = candidateObj;

    var createInfo = `INSERT INTO candidate (cID, accountID, sID, name, phone, email, dob, CMT, address, gender) VALUES('${cID}', '${accountID}', '${sID}', '${name}', '${phone}','${email}', '${dob}', '${CMT}', '${address}', '${gender}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getCandidate = (candidateID) => {
    if (isNil(candidateID)) {
      Reflect(new Error("Cannot find candidate with ID" + candidateID));
    } else {
    var getInfo = `SELECT * FROM candidate WHERE CID = '${candidateID}'`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Candidate not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };

  //update location's info
  const updateCandidate = (CID, candidateObj) => {
    //destruct obj for further use
    var {studentID, universityID, name, phone, email, dob} = candidateObj;

    var updateInfo = `UPDATE candidate SET studentID = '${studentID}', universityID = '${universityID}', 'name = '${name}', phone = '${phone}', email = '${email}', dob = '${dob}' WHERE CID = '${CID}'`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteCandidate = (candidateID) => {
    var deleteInfo = `DELETE FROM candidate WHERE CID = '${candidateID}'`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };
  const checkCandidateExisted = ({email, CMT}) => {
    const check = `Select * from candidate where email = '${email}' or CMT = '${CMT}'`;
    return new Promise((resolve, reject) => {
      query(check).then(result => {
        if (result.length) {
          let msg = result[0].email === email ? "email_existed" : "CMT_existed";
          reject(new Error(msg));
        } else {
          resolve();
        }
      }).catch(err => reject(err));
    })
  };

  //get candidate by ID
  const getCandidateByAccountID = (accountID) => {
    const sql = `SELECT * from candidate where accountID = '${accountID}'`;
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

  return {
    createCandidate,
    getCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateByAccountID,
    checkCandidateExisted
    //define function name here
  }
};
module.exports = candidateSql;
