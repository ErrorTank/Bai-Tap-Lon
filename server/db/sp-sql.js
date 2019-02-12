const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const spSql = (db) => {
  const query = createQuery(db);

  const checkSpExisted = ({email}) => {
    const check = `Select * from schoolpresenter where email = '${email}'`;
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
  const getSpByAccountID = (accountID) => {
    const sql = `SELECT * from schoolpresenter where accountID = '${accountID}'`;
    return new Promise((resolve, reject) => {
      query(sql).then(result => {
        if(result.length){
          resolve(result[0]);
        }else{
          reject(new Error("not_found"));
        }
      }).catch(err => reject(err));
    })
  };
  const createSp = (sp) => {
    //generate random ID for location
    var id = uniquid();
    var spID = id.slice(-6,-1)+id.slice(-1);

    //destruct object for further use
    var {accountID, sID, name, phone, email, address} = sp;

    var createInfo = `INSERT INTO schoolpresenter (spID, accountID, sID, name, phone, email, address) VALUES('${spID}', '${accountID}', '${sID}', '${name}', '${phone}','${email}', '${address}')`;
    return new Promise((resolve, reject) =>
      query(createInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };

  return {
    checkSpExisted,
    createSp,
    getSpByAccountID
    //define function name here
  }
};
module.exports = spSql;
