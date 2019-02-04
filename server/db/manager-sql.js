const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const managerSql = (db) => {
  const query = createQuery(db);

  //create location
  const createManager = (managerObj) => {
    //generate random ID for location
    var id = uniquid();
    var managerID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {name, email, phone} = managerObj;

    var createInfo = `INSERT INTO manager (managerID, name, email, phone) VALUES('${managerID}', '${name}','${email}','${phone}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getManager = (managerID) => {
    if (isNil(managerID)) {
      Reflect(new Error("Cannot find manager with ID" + managerID));
    } else {
    var getInfo = `SELECT * FROM manager WHERE UID = '${managerID}'`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Manager not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };

  //update location's info
  const updateManager = (managerID, managerObj) => {
    //destruct obj for further use
    var {name, email, phone} = managerObj;

    var updateInfo = `UPDATE manager SET name = '${name}', email = '${email}', phone = '${phone}' WHERE managerID = '${managerID}'`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteManager = (managerID) => {
    
    var deleteInfo = `DELETE FROM manager WHERE managerID = '${managerID}'`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createManager,
    getManager,
    updateManager,
    deleteManager
    //define function name here
  }
};
module.exports = managerSql;
