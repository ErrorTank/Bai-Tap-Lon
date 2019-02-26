const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const contestSql = (db) => {
  const query = createQuery(db);

  //create location
  const createContest = (contestObj) => {
    //generate random ID for location
    let id = uniquid();
    let contestID = id.slice(-6, -1) + id.slice(-1);

    //destruct object for further use
    let {canSeeResult, content, contestName, fee, orgLocationID, subjectID, examDates: rootDates} = contestObj;
    let examDates = JSON.parse(rootDates);
    console.log(examDates);
    let promises = [query(`INSERT INTO contest (contestID, content, contestName, fee, orgLocationID, subjectID, canSeeResult) VALUES('${contestID}', '${content}', '${contestName}','${Number(fee)}','${orgLocationID}','${subjectID}','${Number(canSeeResult)}')`)];
    examDates.forEach(examDate => {
      let {start, stop, content, roomID, candidates, supervisors} = examDate;
      let id = uniquid();
      let examDateID = id.slice(-6, -1) + id.slice(-1);

      promises.push(query(`INSERT INTO examdate (examDateID, start, stop, content, contestID, roomID)  VALUES('${examDateID}', '${start}', '${stop}','${content}','${contestID}','${roomID}')`));
      candidates.forEach(can => {
        let {SBD, cID} = can;
        promises.push(query(`INSERT INTO examdatecandidate (examDateID, SBD, cID)  VALUES('${examDateID}', '${SBD}', '${cID}')`));
      });
      supervisors.forEach(s => {
        let {supervisorID} = s;
        promises.push(query(`INSERT INTO examdatesupervisor (supervisorID, examDateID)  VALUES('${supervisorID}', '${examDateID}')`));
      });
    });
    return new Promise((resolve, reject) => {
        Promise.all(promises).then((result) => {
          resolve(contestID);
        }).catch(err => {
          reject(err)
        })
      }
    )
  };

  //get location
  const getContest = (contestID) => {
    return new Promise((resolve, reject) => {
      if (isNil(contestID)) {
        reject(new Error("Cannot find contest with ID: " + contestID));
      } else {
        const getInfo = `SELECT * FROM contest where contestID = '${contestID}'`;
        query(getInfo).then((result) => {
          if (result.length) {
            resolve(result[0]);
          } else {
            reject(new Error("contest not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };

  const updateContest = (contestID, contestObj) => {
    return new Promise((resolve, reject) => {
      if (isNil(contestID)) {
        reject(new Error("Cannot find contest with ID: " + contestID));
      } else {

        let {name, address, phone, email} = contestObj;
        const checkExist = `SELECT email from contest where not contestID = '${contestID}' and email = '${email}'`;
        const getInfo = `UPDATE contest SET  name = '${name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE contestID = '${contestID}'`;
        query(checkExist).then((result) => {
          if (result && result.length) {
            reject(new Error("email_existed"));
          } else {
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


  const getContestBriefWithCondition = (obj) => {
    let {keyword, skip, take, orderAsc, orderBy, canSeeResult} = obj;

    const sql = `Select  SQL_CALC_FOUND_ROWS c.contestID, c.contestName as contestName, c.fee, s.name as subjectName, ol.name as orgLocation  ,  Count(mix.cID) as count from contest c inner join subject s on s.subjectID = c.subjectID inner join orglocation ol on ol.orgLocationID = c.orgLocationID left join (select cID, contestID from examdatecandidate ec inner join examdate e on e.examDateID = ec.examDateID) mix  on mix.contestID = c.contestID  where ${keyword ? `c.contestName like '%${keyword}%' or c.contestID = '${keyword}'` : "1=1"}  ${!isNil(canSeeResult) ? `and c.canSeeResult = '${Number(canSeeResult)}'` : "and 1=1"} group by c.contestID  ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;
    console.log(sql);
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        query(`Select FOUND_ROWS() as count`).then((result2) => {

          resolve({contests: result, total: result2[0].count});
        }).catch(err => reject(err));

      }).catch(err => reject(err));
    })

  };

  const checkContestExisted = ({email}) => {
    const check = `Select * from contest where email = '${email}' `;
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
  const deleteContest = (contestID) => {

    var deleteInfo = `DELETE FROM contest WHERE contestID = '${contestID}'`;
    return new Promise((resolve, reject) => {
        query(deleteInfo).then((result) => {
          resolve();
        }).catch(err => {
          reject(err)
        })
      }
    )
  };

  const getContestsBrief = () => {
    let getInfo = `SELECT * FROM contest`;
    return new Promise((resolve, reject) =>
        query(getInfo).then((result) => {
          resolve(result);
        }).catch(err => {
          reject(err)
        })
    )
  };

  const getExamDatesByContestID = (contestID) => {
    return new Promise((resolve, reject) => {
      query(`SELECT * FROM examdate where contestID = '${contestID}'`).then((result) => {
        resolve(result);
      }).catch(err => reject(err));
    })
  };

  return {
    createContest,
    getContest,
    updateContest,
    deleteContest,
    checkContestExisted,
    getContestBriefWithCondition,
    getContestsBrief,
    getExamDatesByContestID
    //define function name here
  }
};
module.exports = contestSql;
