const uniquid = require("uniquid");
const {
  DBError
} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
//get Room, create room, delete room, update room
const roomSql = (db) => {
  const query = createQuery(db);
  const getRoom = (roomID) => {
    if (isNil(roomID)) {
      Reflect(new Error("Cannot find room with ID" + roomID));
    } else {
      const getInfo = `SELECT * FROM room WHERE roomID = '${roomID}'`;
      return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("Room not found"));
          }
        }).catch(err => {
          reject(err)
        })
      )
    }
  };
  const createRoom = (roomObj) => {
    var id = uniquid();
    roomID = id.slice(-6,-1) + id.slice(-1);

    var {orgLocationID} = roomObj;

    var createInfo = `INSERT INTO room (roomID,orgLocationID) VALUES('${roomID}','${locationID}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  const updateRoom = (roomID, roomObj) => {
    var {orgLocationID} = roomObj;
    var updateInfo = `UPDATE room SET name = '${name}', address = '${address}' WHERE orgLocationID = '${locationID}'`;
    return new Promise((resolve, reject) =>
      query(updateInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  return {
    getRoom,
    //define function name here
  }
};
module.exports = roomSql;