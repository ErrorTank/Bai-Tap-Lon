const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const subjectSql = (db) => {
  const query = createQuery(db);

  //create location
  const createSubject = (subjectObj) => {
    //generate random ID for location
    var id = uniquid();
    var subjectID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {name} = subjectObj;

    var createInfo = `INSERT INTO subject (subjectID, name) VALUES('${subjectID}','${name}')`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  };

  //get location
  const getSubject = (SubjectID) => {
    if (isNil(SubjectID)) {
      Reflect(new Error("Cannot find subject with ID" + subjectID));
    } else {
    var getInfo = `SELECT * FROM subject WHERE subjectID = '${subjectID}'`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Subject not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };

  //update location's info
  const updateSubject = (subjectID, subjectObj) => {
    //destruct obj for further use
    var {name} = subjectObj;

    var updateInfo = `UPDATE subject SET subjectID = '${subjectID}', 'name = '${name}'`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteSubject = (subjectID) => {
    
    var deleteInfo = `DELETE FROM subject WHERE subjectID = '${subjectID}'`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
            resolve();
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createSubject,
    getSubject,
    updateSubject,
    deleteSubject
    //define function name here
  }
};
module.exports = subjectSql;
