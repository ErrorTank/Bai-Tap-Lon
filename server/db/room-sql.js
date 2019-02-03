const {DBError} = require("../utils/error/error-types");
const createQuery = require("../config/query");
const isNil = require("lodash/isNil");

const roomSql = (db) => {
  const query = createQuery(db);
  const getRoom = (userID) => {

    //logic
  };
  //define function here
  //const updateRoom = (roomID, data) => {
  //  logic
  // }

  return {
    getRoom,
    //define function name here
  }
};
module.exports = roomSql;
