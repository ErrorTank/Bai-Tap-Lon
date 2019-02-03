var uniqid = require('uniquid');
var universitySql = require('university-sql');

class Univerisity {
  constructor(universityID, name, address, phone, email){
    this.universityID = universityID;
    this.name = name;
    this.address = address;
    this.phone = phone
    this.email = email;
    var id = uniqid();
    this.UID = id.slice(-6,-1)+id.slice(-1);
  }

  create(universityID, name, address, phone, email)
  {
    var id = uniqid();
    this.UID = id.slice(-6,-1)+id.slice(-1);
    accountSql.insert(UID, universityID, name, address, phone, email);
  }

  delete(UID)
  {
    universiSql.delete(UID);
  }

  update(UID, universityID, name, address, phone, email)
  {
    universitySql.update(universityID, name, address, phone, email);
  }

  read()
  {
    universitySql.read();
  }

}

module.exports = Univerisity;
