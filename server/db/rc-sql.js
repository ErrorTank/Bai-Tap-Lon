const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");
const uniquid = require("uniquid");

const supervisorSql = (db) => {
    const query = createQuery(db);

    //create location
    const createSupervisor = (supervisorObj) => {
        //generate random ID for location
        var id = uniquid();
        var supervisorID = id.slice(-6, -1) + id.slice(-1);

        //destruct object for further use
        var {name, email, phone, address} = supervisorObj;

        var createInfo = `INSERT INTO supervisor (supervisorID, name, email, phone, address) VALUES('${supervisorID}', '${name}', '${email}','${phone}','${address}')`;
        return new Promise((resolve, reject) =>
            query(createInfo).then((result) => {
                resolve(supervisorID);
            }).catch(err => {
                reject(err)
            })
        )
    };

    //get location
    const getSupervisor = (supervisorID) => {
        return new Promise((resolve, reject) => {
            if (isNil(supervisorID)) {
                reject(new Error("Cannot find supervisor with ID: " + supervisorID));
            } else {
                const getInfo = `SELECT * FROM supervisor where supervisorID = '${supervisorID}'`;
                query(getInfo).then((result) => {
                    if (result.length) {
                        resolve(result[0]);
                    } else {
                        reject(new Error("supervisor not found"));
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        });
    };

    const updateSupervisor = (supervisorID, supervisorObj) => {
        return new Promise((resolve, reject) => {
            if(isNil(supervisorID)){
                reject(new Error("Cannot find supervisor with ID: " + supervisorID));
            }else{

                let {name,  address, phone, email}  = supervisorObj;
                const checkExist = `SELECT email from supervisor where not supervisorID = '${supervisorID}' and email = '${email}'`;
                const getInfo = `UPDATE supervisor SET  name = '${name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE supervisorID = '${supervisorID}'`;
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


    const getRcBriefWithCondition = (obj) => {
        let {keyword, skip, take, orderAsc, orderBy, gender} = obj;

        const sql = `Select  SQL_CALC_FOUND_ROWS * from registrationcandidate where ${keyword ? `(name like '%${keyword}%' or email  like '%${keyword}%' or phone like '%${keyword}%' or rcID = '${keyword}') ` : "1=1"} ${!isNil(gender) ? `and gender = '${Number(gender)}'` : "and 1=1"} ${orderBy ? `Order By ${orderBy} ${orderAsc ? "ASC" : "DESC"}` : ""} ${(skip && take) ? `limit ${take} offset ${skip}` : ""}`;

        return new Promise((resolve, reject) => {
            query(sql).then(result => {
                query(`Select FOUND_ROWS() as count`).then((result2) => {

                    resolve({rcs: result, total: result2[0].count});
                }).catch(err => reject(err));

            }).catch(err => reject(err));
        })

    };

    const checkSupervisorExisted = ({email}) => {
        const check = `Select * from supervisor where email = '${email}' `;
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
    const deleteSupervisor = (supervisorID) => {

        var deleteInfo = `DELETE FROM supervisor WHERE supervisorID = '${supervisorID}'`;
        return new Promise((resolve, reject) => {
                query(deleteInfo).then((result) => {
                    resolve();
                }).catch(err => {
                    reject(err)
                })
            }
        )
    };
    const getSupervisorsBrief = () => {
        let getInfo = `SELECT * FROM supervisor`;
        return new Promise((resolve, reject) =>
            query(getInfo).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })
        )
    };
    return {
        createSupervisor,
        getSupervisor,
        updateSupervisor,
        deleteSupervisor,
        checkSupervisorExisted,
        getRcBriefWithCondition,
        getSupervisorsBrief
        //define function name here
    }
};
module.exports = supervisorSql;
