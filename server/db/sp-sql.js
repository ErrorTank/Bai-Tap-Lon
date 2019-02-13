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

  const getSp = (spID) => {
    return new Promise((resolve, reject) => {
      if(isNil(spID)){
        reject(new Error("Cannot find SP with ID: " + spID));
      }else{
        const getInfo = `SELECT * FROM schoolpresenter where spID = '${spID}'`;
        query(getInfo).then((result) => {
          if(result.length){
            resolve(result[0]);
          }else{
            reject(new Error("sp not found"));
          }
        }).catch(err => {
          reject(err)
        })
      }
    });
  };
  const deleteSp = (spID) => {
    var deleteInfo = `DELETE FROM schoolpresenter WHERE spID = '${spID}'`;
    return new Promise((resolve, reject) =>
      query(deleteInfo).then((result) => {
        resolve();
      }).catch(err => {
        reject(err)
      })
    )
  };
  const updateSp = (spID, sp) => {
    return new Promise((resolve, reject) => {
      if(isNil(spID)){
        reject(new Error("Cannot find sp with ID: " + spID));
      }else{

        let {name, sID, address, phone, email}  = sp;
        const checkExist = `SELECT email from schoolpresenter where not spID = '${spID}' and email = '${email}'`;
        const getInfo = `UPDATE schoolpresenter SET name = '${name}', sID = '${sID}', phone = '${phone}',  address = '${address}' WHERE spID = '${spID}'`;
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

  return {
    updateSp,
    getSp,
    deleteSp,
    checkSpExisted,
    createSp,
    getSpByAccountID
    //define function name here
  }
};
module.exports = spSql;
