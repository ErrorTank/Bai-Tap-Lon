var uniqid = require('uniquid');
var universitySql = require('university-sql');

//( `universityID` VARCHAR(10) NOT NULL , `name` VARCHAR(100) NOT NULL , `address` VARCHAR(100) NULL , `phone` VARCHAR(20) NOT NULL , `email` VARCHAR(100) NOT NULL ,

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
    accountSql.create(UID, universityID, name, address, phone, email);
  }

  delete(UID)
  {
    universiSql.delete(UID);
  }

  update(UID, universityID, name, address, phone, email)
  {
    accountSql.update(UID, universityID, name, address, phone, email);
  }

  read()
  {
    universitySql.read();
  }

}

module.exports = Account;
