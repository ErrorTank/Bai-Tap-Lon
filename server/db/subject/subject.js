var uniqid = require('uniquid');
var subjectSql = require('subject-sql');

class Subject {
  constructor(name){
    this.name = name;
    var id = uniqid();
    this.subejectID = id.slice(-6,-1)+id.slice(-1);
  }

  create(name)
  {
    var id = uniqid();
    this.subjectID = id.slice(-6,-1)+id.slice(-1);
    subjectSql.insert(subjectID, name);
  }

  delete(subjectID)
  {
    subjectSql.delete(subjectID);
  }

  update(subjectID, name)
  {
    subjectSql.update(subjectID, name);
  }

  read()
  {
    subjectSql.read();
  }

}

module.exports = Subject;
