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
  return {
    getOrgLocationBriefWithCondition,
    createOrgLocation
    //define function name here
  }
};
module.exports = orgLocationSql;
