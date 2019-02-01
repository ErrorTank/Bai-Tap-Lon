var uniqid = require('uniquid');
var accountSql = require('account-sql');

class Account {
  constructor(username, password, email, role){
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    var id = uniqid();
    this.accountID = id.slice(-6,-1)+id.slice(-1);
  }

  create(Username, Password, Email, Role)
  {
    var id = uniqid();
    this.accountID = id.slice(-6,-1)+id.slice(-1);
    accountSql.create(accountID, username, password, role, email);
  }

  delete(accountID)
  {
    accountSql.delete(accountID);
  }

  update(accountID, username, password, role, email)
  {
    accountSql.update(accountID, username, password, role, email);
  }

  read()
  {
    accountSql.read();
  }

}

module.exports = Account;
