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
  return {
    getOrgLocationBriefWithCondition
    //define function name here
  }
};
module.exports = orgLocationSql;
