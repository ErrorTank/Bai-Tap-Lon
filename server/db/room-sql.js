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
    var roomID = id.slice(-6,-1) + id.slice(-1);

    var {orgLocationID} = roomObj;

    var createInfo = `INSERT INTO room (roomID,orgLocationID,name) VALUES('${roomID}','${orglocationID}','${name}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  const updateRoom = (roomID, roomObj) => {
    var {orgLocationID,name} = roomObj;
    var updateInfo = `UPDATE room SET name = '${name}' WHERE roomID = '${roomID}'`;
    return new Promise((resolve, reject) =>
      query(updateInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  const deleteRoom = (roomID) => {
    var deleteInfo = `DELETE FROM room WHERE roomID = '${roomID}'`;
    return new Promise((resolve, reject) =>
      query(deleteInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  }

  //
const getRoomByorgLocationID = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS * from room where ${keyword ? `(orgLocation like '%${keyword}%') ` : "1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;

    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({supervisors: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };
  return {
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomByorgLocationID
    //define function name here
  }
};
module.exports = roomSql;