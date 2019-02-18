const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const prizeSql = (db) => {
  const query = createQuery(db);
  //create prize
  const createPrize = ({data, files}) => {
    //create random ID for prize
    var id = uniquid();
    let prizeID = id.slice(-6, -1) + id.slice(-1);

    //
    var {name, content} = data;

    var createInfo = `INSERT INTO prize (prizeID, name, content) VALUES('${prizeID}', '${name}', '${content}')`;

    return new Promise((resolve, reject) => {
      query(createInfo).then(() => {
        if (files.length) {
          let promises = files.map(each => {
            let imgID = uniquid();
            query(`INSERT INTO prizeimg (prizeID, link, imgID) VALUES('${prizeID}', '${each.filename}', '${imgID.slice(-6, -1) + imgID.slice(-1)}')`)
          });
          Promise.all(promises).then(() => {
            resolve(prizeID);
          }).catch(err => reject(err));

        } else {
          resolve(prizeID);
        }

      }).catch(err => {
        reject(err)
      })
    })
  };

  //get location
  const getPrize = (prizeID) => {
    return new Promise((resolve, reject) => {
      if (isNil(prizeID)) {
        reject(new Error("Cannot find prize with ID: " + prizeID));
      } else {
        const getInfo = `SELECT * FROM prize where prizeID = '${prizeID}'`;
        const getImg = `SELECT * from prizeimg where prizeID = '${prizeID}'`;
        Promise.all([query(getInfo), query(getImg)]).then(([result1, result2]) => {
          if (result1.length) {
            resolve({...result1[0], files: result2});
          } else {
            reject(new Error("prize not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }

    });
  };

  //update location's info
  const updatePrize = (prizeID, prizeObj) => {
    //
    var {name, address} = prizeObj;

    var updateInfo = `UPDATE prize SET name = ${name}, content = ${content} WHERE prizeID = '${prizeID}'`;
    return new Promise((resolve, reject) =>
      query(updateInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  //delete location
  const deletePrize = (prizeID) => {
    var deleteInfo = `DELETE FROM prize WHERE prizeID = '${prizeID}'`;
    var deleteImage = `DELETE FROM prizeimg WHERE prizeID = '${prizeID}'`;
    return new Promise((resolve, reject) => {
        Promise.all([query(deleteInfo), query(deleteImage)]).then((result) => {

          resolve();
        }).catch(err => {

          reject(err)
        })
      }
    )
  };

  return {
    createPrize,
    getPrize,
    updatePrize,
    deletePrize
    //define function name here
  }
};
module.exports = prizeSql;
