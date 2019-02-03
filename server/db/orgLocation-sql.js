const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");

var locationObj = {
  name: '1',
  address: '2'
};
var {name, address} = locationObj;

const orgLocationSql = (db) => {
  const query = createQuery(db);
  //create location
  const createLocation = (locationObj) => {
    var id = uniqid();
    this.locationID = id.slice(-6,-1)+id.slice(-1);

    var createInfo = `INSERT INTO orgLocation (orgLocationID, name, address) VALUES(${locationID}, ${name}, ${address})`;
    return new Promise((resolve, reject) =>
        query(createInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("Can't create location"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  };

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
  const updateLocation = (locationID, locationObj) => {
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
            reject(new Error("Can't delete location"));
          }
        }).catch(err => {
          reject(err)
        })
      )
  }

  return {
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
    //define function name here
  }
};
module.exports = orgLocationSql;
