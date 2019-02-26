const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const resultSql = (db) => {
  const query = createQuery(db);

  //create location
  const createResult = (resultObj) => {
    //generate random ID for location
    var id = uniquid();
    var rID = id.slice(-6, -1) + id.slice(-1);

    //destruct object for further use
    var {cID, contestID, mark} = resultObj;

    var createInfo = `INSERT INTO reportcard (rID, cID, contestID, mark) VALUES('${rID}', '${cID}', '${contestID}','${mark}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve(rID);
      }).catch(err => {
        reject(err)
      })
    )
  };

  //get location
  const getResult = (resultID) => {
    return new Promise((resolve, reject) => {
      if (isNil(resultID)) {
        reject(new Error("Cannot find result with ID: " + resultID));
      } else {
        const getInfo = `SELECT * FROM result where resultID = '${resultID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("result not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };

  const updateResult = (resultID, resultObj) => {
    return new Promise((resolve, reject) => {
      if(isNil(resultID)){
        reject(new Error("Cannot find result with ID: " + resultID));
      }else{

        let {name,  address, phone, email}  = resultObj;
        const checkExist = `SELECT email from result where not resultID = '${resultID}' and email = '${email}'`;
        const getInfo = `UPDATE result SET  name = '${name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE resultID = '${resultID}'`;
        query(checkExist).then((result) => {
          if(result && result.length){
            reject(new Error("email_existed"));
          }else{
            query(getInfo).then(() => {
              resolve();
            }).catch(err => {
              reject(err)
            })
          }
        }).catch(err => reject(err));

      }

    });
  };


  const getResultBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS * from (select rID, mark from reportcard r left join candidate c on r.cID = c.cID left join contest con on r.contestID = con.contestID) mixed   ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql)
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({results: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };

  const checkResultExisted = ({email}) => {
    const check = `Select * from result where email = '${email}' `;
    return new Promise((resolve, reject) => {
      query(check).then(result => {
        if (result.length) {
          reject(new Error("email_existed"));
        } else {
          resolve();
        }
      }).catch(err => reject(err));
    })
  };

  //delete location
  const deleteResult = (resultID) => {

    var deleteInfo = `DELETE FROM result WHERE resultID = '${resultID}'`;
    return new Promise((resolve, reject) => {
        query(deleteInfo).then((result) => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }
    )
  };
  const getResultsBrief = () => {
    let getInfo = `SELECT * FROM result`;
    return new Promise((resolve, reject) =>
      query(getInfo).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    )
  };
  return {
    createResult,
    getResult,
    updateResult,
    deleteResult,
    checkResultExisted,
    getResultBriefWithCondition,
    getResultsBrief
    //define function name here
  }
};
module.exports = resultSql;
