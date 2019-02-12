const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const supervisorySql = (db) => {
  const query = createQuery(db);

  //create location
  const createSupervisory = (supervisoryObj) => {
    //generate random ID for location
    var id = uniquid();
    var SID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {supervisoryID, name, email, phone, address} = supervisoryObj;

    var createInfo = `INSERT INTO supervisory (SID, supervisoryID, name, email, phone, address) VALUES('${SID}','${supervisoryID}', '${name}', '${email}','${phone}','${address}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getSupervisory = (supervisoryID) => {
    if (isNil(supervisoryID)) {
      Reflect(new Error("Cannot find univerisyt with ID" + supervisoryID));
    } else {
    var getInfo = `SELECT * FROM supervisory WHERE SID = '${supervisoryID}'`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Supervisory not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };

  //update location's info
  const updateSupervisory = (SID, supervisoryObj) => {
    //destruct obj for further use
    var {supervisoryID, name, email, phone, address} = supervisoryObj;

    var updateInfo = `UPDATE supervisory SET supervisoryID = '${supervisoryID}', 'name = '${name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE SID = '${SID}'`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteSupervisory = (supervisoryID) => {
    
    var deleteInfo = `DELETE FROM supervisory WHERE SID = '${supervisoryID}'`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createSupervisory,
    getSupervisory,
    updateSupervisory,
    deleteSupervisory
    //define function name here
  }
};
module.exports = supervisorySql;
