const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const universitySql = (db) => {
  const query = createQuery(db);

  //create location
  const createUniversity = (universityObj) => {
    //generate random ID for location
    var id = uniquid();
    var UID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {universityID, name, address, phone, email} = universityObj;

    var createInfo = `INSERT INTO university (UID, universityID, name, address, phone, email) VALUES('${UID}','${universityID}', '${name}', '${address}','${phone}','${email}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getUniverisity = (universityID) => {
    if (isNil(universityID)) {
      Reflect(new Error("Cannot find univerisyt with ID" + universityID));
    } else {
    var getInfo = `SELECT * FROM university WHERE UID = '${universityID}'`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("University not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };

  //update location's info
  const updateUniversity = (UID, universityObj) => {
    //destruct obj for further use
    var {universityID, name, address, phone, email} = universityObj;

    var updateInfo = `UPDATE university SET universityID = '${universityID}, 'name = '${name}', address = '${address}', phone = '${phone}', email = '${email}' WHERE UID = '${UID}'`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteUniversity = (universityID) => {
    
    var deleteInfo = `DELETE FROM university WHERE UID = '${universityID}'`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createUniversity,
    getUniverisity,
    updateUniversity,
    deleteUniversity
    //define function name here
  }
};
module.exports = universitySql;
