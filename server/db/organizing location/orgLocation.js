var uniqid = require('uniquid');
var orgLocationSql = require('orgLocation-sql');

class orgLocation {
  constructor(name, address){
    this.name = name;
    this.address = address;
    var id = uniqid();
    this.orgLocationID = id.slice(-6,-1)+id.slice(-1);
  }

  create(name, address)
  {
    var id = uniqid();
    this.orgLocationID = id.slice(-6,-1)+id.slice(-1);
    orgLocationSql.insert(orgLocationID, name, address);
  }

  delete(orgLocationID)
  {
    orgLocationSql.delete(orgLocationID);
  }

  update(orgLocationID, name, address)
  {
    orgLocationSql.update(orgLocationID, name, address);
  }

  read()
  {
    orgLocationSql.read();
  }

}

module.exports = orgLocation;
