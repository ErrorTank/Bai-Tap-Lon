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
    var subjectID = id.slice(-6, -1) + id.slice(-1);

    //destruct object for further use
    var {name} = subjectObj;

    var createInfo = `INSERT INTO subject (subjectID, name) VALUES('${subjectID}', '${name}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve(subjectID);
      }).catch(err => {
        reject(err)
      })
    )
  };

  //get location
  const getSubject = (subjectID) => {
    return new Promise((resolve, reject) => {
      if (isNil(subjectID)) {
        reject(new Error("Cannot find subject with ID: " + subjectID));
      } else {
        const getInfo = `SELECT * FROM subject where subjectID = '${subjectID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("subject not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };

  const updateSubject = (subjectID, subjectObj) => {
    return new Promise((resolve, reject) => {
      if (isNil(subjectID)) {
        reject(new Error("Cannot find subject with ID: " + subjectID));
      } else {

        let {name, content} = subjectObj;
        const getInfo = `UPDATE subject SET  name = '${name}', content = '${content}' WHERE subjectID = '${subjectID}'`;
        query(getInfo).then(() => {
          resolve();
        }).catch(err => {
          reject(err)
        })

      }

    });
  };


  const getSubjectBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS * from subject where ${keyword ? `(name like '%${keyword}%' or subjectID = '${keyword}')` : "1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;

    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({subjects: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };

  const getSubjectsBrief = () => {
    let getInfo = `SELECT subjectID, name, content FROM subject`;
    return new Promise((resolve, reject) =>
      query(getInfo).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    )
  };

  //delete location
  const deleteSubject = (subjectID) => {

    var deleteInfo = `DELETE FROM subject WHERE subjectID = '${subjectID}'`;
    return new Promise((resolve, reject) => {
        query(deleteInfo).then((result) => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }
    )
  };

  return {
    getSubjectsBrief,
    createSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    getSubjectBriefWithCondition
    //define function name here
  }
};
module.exports = subjectSql;
