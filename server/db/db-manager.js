const accountSql = require("../db/account-sql");
const userSql = require("../db/user-sql");
const spSql = require("../db/sp-sql");
const candidateSql = require("../db/candidate-sql");
const schoolSql = require("../db/school-sql");

const createDbManager = (db) => {
  const dbs = {
    user: userSql(db),
    account: accountSql(db),
    sp: spSql(db),
    candidate: candidateSql(db),
    school: schoolSql(db),

  };
  return (key) => {
    return dbs[key];
  }
};

module.exports = createDbManager;