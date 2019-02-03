var uniqid = require('uniquid');
var roomSql = require('user-sql');

class Room {
  constructor(roomID, orgLocationID){
    
    var id = uniqid();
    this.userID = id.slice(-6,-1)+id.slice(-1);
  }

  create(roomID, orgLocationID)
  {
    var id = uniqid();
    this.userID = id.slice(-6,-1)+id.slice(-1);
    roomSql.insert(roomID, orgLocationID);
  }

  delete(roomID)
  {
    roomSql.delete(roomID);
  }

  update(roomID, orgLocationID)
  {
    roomSql.update(roomID, orgLocationID);
  }

  read()
  {
    roomSql.read();
  }

}

module.exports = Room;
