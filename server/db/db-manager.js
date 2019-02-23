const accountSql = require("../db/account-sql");
const userSql = require("../db/user-sql");
const spSql = require("../db/sp-sql");
const candidateSql = require("../db/candidate-sql");
const schoolSql = require("../db/school-sql");
const prizeSql = require("../db/prize-sql");
const supervisorSql = require("../db/supervisor-sql");
const orgLocationSql = require("../db/org-location-sql");
const contestSql = require("../db/contest-sql");
const subjectSql = require("../db/subject-sql");
const roomSql = require("../db/room-sql");

const createDbManager = (db) => {
  const dbs = {
    user: userSql(db),
    contest: contestSql(db),
    account: accountSql(db),
    sp: spSql(db),
    candidate: candidateSql(db),
    school: schoolSql(db),
    prize: prizeSql(db),
    supervisor: supervisorSql(db),
    orgLocation: orgLocationSql(db),
    subject: subjectSql(db),
    room: roomSql(db),
  };
  return (key) => {
    return dbs[key];
  }
};

module.exports = createDbManager;