const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");

const orgLocationSql = (db) => {
  const query = createQuery(db);

  //get location
  const getLocation = (locationID) => {
    var getInfo = `SELECT * FROM orgLocation WHERE orgLocationID = ${locationID}`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Location not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  };

  //update location's info
  const updateLocation = (locationID, name, address) => {
    var updateInfo = `UPDATE orgLocation SET name = ${name}, address = ${address} WHERE orgLocationID = ${locationID}`;
    return new Promise((resolve, reject) =>
        query(updateInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Can't update location"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  }

  //delete location
  const deleteLocation = (locationID) => {
    var deleteInfo = `DELETE FROM orgLocation WHERE orgLocationID = ${locationID}`;
    return new Promise((resolve, reject) =>
        query(deleteInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Can't update location"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    getLocation,
    updateLocation,
    deleteLocation
    //define function name here
  }
};
module.exports = orgLocationSql;
