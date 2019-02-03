var uniqid = require('uniquid');
var userSql = require('user-sql');

class User {
  constructor(name, address, phone, email, accountID, employeeID, CMT, gender){
    this.name = name;
    this.address = address;
    this.phone = phone
    this.email = email;
    this.accountID = accountID;
    this.employeeID = employeeID;
    this.CMT = CMT;
    this.gender = gender;
    var id = uniqid();
    this.userID = id.slice(-6,-1)+id.slice(-1);
  }

  create(name, address, phone, email, accountID, employeeID, CMT, gender)
  {
    var id = uniqid();
    this.userID = id.slice(-6,-1)+id.slice(-1);
    userSql.insert(userID, name, address, phone, email, accountID, employeeID, CMT, gender);
  }

  delete(userID)
  {
    userSql.delete(userID);
  }

  update(userID, name, address, phone, email, accountID, employeeID, CMT, gender)
  {
    userSql.update(userID, name, address, phone, email, accountID, employeeID, CMT, gender);
  }

  read()
  {
    userSql.read();
  }

}

module.exports = User;
