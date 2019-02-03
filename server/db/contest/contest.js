var uniqid = require('uniquid');
var contestSql = require('contest-sql');

class Contest {
  constructor(start, stop, fee, subjectID){
    this.start = start;
    this.stop = stop;
    this.fee = fee;
    this.subjectID = subjectID;
    var id = uniqid();
    this.contestID = id.slice(-6,-1)+id.slice(-1);
  }

  create(start, stop, fee, subjectID)
  {
    var id = uniqid();
    this.contestID = id.slice(-6,-1)+id.slice(-1);
    contestSql.insert(contestID, start, stop, fee, subjectID);
  }

  delete(contestID)
  {
    contestSql.delete(contestID);
  }

  update(contestID, start, stop, fee, subjectID)
  {
    contestSql.update(contestID, start, stop, fee, subjectID);
  }

  read()
  {
    contestSql.read();
  }

}

module.exports = Contest;
