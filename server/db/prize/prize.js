var uniqid = require('uniquid');
var prizeSql = require('prize-sql');

class Prize {
  constructor(name, content){
    this.name = name;
    this.content = content;
    var id = uniqid();
    this.prizeID = id.slice(-6,-1)+id.slice(-1);
  }

  create(name, content)
  {
    var id = uniqid();
    this.prizeID = id.slice(-6,-1)+id.slice(-1);
    prizeSql.insert(subjectID, name, content);
  }

  delete(prizeID)
  {
    prizetSql.delete(prizeID);
  }

  update(prizeID, name, content)
  {
    prizeSql.update(prizeID, name, content);
  }

  read()
  {
    prizeSql.read();
  }

}

module.exports = Prize;
