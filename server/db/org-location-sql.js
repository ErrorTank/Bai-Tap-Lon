const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const orgLocationSql = (db) => {
  const query = createQuery(db);

  const getOrgLocationBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS * from orglocation where ${keyword ? `(name like '%${keyword}%' or phone like '%${keyword}%'` : "1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;

    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({orgLocations: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };
  const createOrgLocation = (orgLocation) => {
    //generate random ID for location
    var id = uniquid();
    var orgLocationID = id.slice(-6, -1) + id.slice(-1);

    //destruct object for further use
    var {name, address, phone, rooms} = orgLocation;
    var createInfo = `INSERT INTO orglocation (orgLocationID, name, phone, address) VALUES('${orgLocationID}', '${name}','${phone}', '${address}')`;
    let promises = [query(createInfo)];
    if (rooms && rooms.length) {
      for (let room of rooms) {
        let id = uniquid();
        promises.push(query(`INSERT INTO room (roomID, orgLocationID, name, locate, maxSeat) VALUES('${id.slice(-6, -1) + id.slice(-1)}','${orgLocationID}', '${room.name}', '${room.locate}', '${room.maxSeat}')`));
      }

    }
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {

          resolve(orgLocationID);
        }).catch(err => {
          console.log("cc")
          reject(err)
        })
      }
    )
  };

  const getOrgLocation = (orgLocationID) => {
    return new Promise((resolve, reject) => {
      if (isNil(orgLocationID)) {
        reject(new Error("Cannot find org location with ID: " + orgLocationID));
      } else {
        const getInfo = `SELECT * FROM orglocation where orgLocationID = '${orgLocationID}'`;
        const getRooms = `SELECT * From room where orgLocationID = '${orgLocationID}'`;
        let promises = [query(getInfo), query(getRooms)];
        Promise.all(promises).then(([result, result2]) => {
          if (result.length) {

            resolve({...result[0], rooms: [...result2]});
          } else {
            reject(new Error("org location not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };
  const deleteOrgLocation = (orgLocationID) => {

    var deleteInfo = `DELETE FROM orglocation WHERE orgLocationID = '${orgLocationID}'`;
    let deleteRooms = `DELETE from room where orgLocationID = '${orgLocationID}'`;
    let promises = [query(deleteInfo), query(deleteRooms)];
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }
    )
  };

  const updateOrgLocation = (orgLocationID, orgLocation) => {
    return new Promise((resolve, reject) => {
      if (isNil(orgLocationID)) {
        reject(new Error("Cannot find orgLocation with ID: " + orgLocationID));
      } else {

        let {name, address, phone, deleted, created, old} = orgLocation;
        let parseDeleted = JSON.parse(deleted);
        let parseCreated = JSON.parse(created);
        let parseOld = JSON.parse(old);
        let promises = [];
        if (parseDeleted && parseDeleted.length) {
          let rmStr = parseDeleted.reduce((total, cur) => {
            return total + ` roomID = '${cur.roomID}' or`
          }, 'where');
          console.log(rmStr);
          promises.push(query(`DELETE FROM room ${rmStr} 1=0`));
        }
        if (parseCreated && parseCreated.length) {
          parseCreated.forEach(each => {
            let key = uniquid();

            promises.push(query(`INSERT INTO room (roomID, orgLocationID, name, locate, maxSeat) VALUES('${key.slice(-6, -1) + key.slice(-1)}',  '${orgLocationID}','${each.name}', '${each.locate}', '${each.maxSeat}')`));
          });
        }
        if (parseOld && parseOld.length) {
          parseOld.forEach(each => {

            promises.push(query(`Update room set name = '${each.name}', locate = '${each.locate}', maxSeat = '${each.maxSeat}' where roomID = '${each.roomID}'`));
          });
        }
        promises.push(query(`Update  orglocation set name = '${name}', address = '${address}', phone = '${phone}' where orgLocationID = '${orgLocationID}'`));
        Promise.all(promises).then(() => {
          resolve()
        }).catch(err => reject(err));

      }

    });
  };

  return {
    getOrgLocationBriefWithCondition,
    createOrgLocation,
    getOrgLocation,
    deleteOrgLocation,
    updateOrgLocation
    //define function name here
  }
};
module.exports = orgLocationSql;
