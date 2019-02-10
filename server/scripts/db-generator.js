const initializeDb = require("../config/db");

const dbUtils = [
  {
    name: "Create Account table",
    query: "CREATE TABLE `olympic`.`Account` ( `accountID` VARCHAR(10) NOT NULL ,  `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , `role` INT(11) NOT NULL , `canLogin` BOOLEAN NOT NULL , PRIMARY KEY (`accountID`), UNIQUE (`username`)) ENGINE = InnoDB;"
  }, {
    name: "Create User Table",
    query: "CREATE TABLE `olympic`.`User` ( `userID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , `CMT` VARCHAR(20) NOT NULL , `address` VARCHAR(200) NULL , `phone` VARCHAR(50) NULL , `email` VARCHAR(50) NOT NULL , `accountID` VARCHAR(10) NOT NULL , `employeeID` VARCHAR(10) NOT NULL , `gender` INT(1) NOT NULL , PRIMARY KEY (`userID`), UNIQUE (`email`), UNIQUE (`accountID`), UNIQUE (`employeeID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create Admin",
    query: "INSERT INTO `account` (`accountID`,  `username`, `password`, `role`, `canLogin`) VALUES ('1',  'kappa2', '123123qwe', '0', '1');"
  }, {
    name: "Create Admin info",
    query: "INSERT INTO `user` (`userID`, `name`, `address`, `phone`, `email`, `accountID`, `employeeID`, `CMT`, `gender`) VALUES ('1', 'Kappa', 'No fucking where', '0123456789', 'kappa@gmail.com', '1', '1', '123456', '0');"
  }, {
    name: "Create school table",
    query: "CREATE TABLE `olympic`.`school` ( `sID` VARCHAR(10) NOT NULL , `name` VARCHAR(100) NOT NULL , `address` VARCHAR(100) NOT NULL , `phone` VARCHAR(20) NOT NULL , `email` VARCHAR(100) NOT NULL , PRIMARY KEY (`sID`), UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create school presenter table",
    query: "CREATE TABLE `olympic`.`schoolPresenter` ( `spID` VARCHAR(10) NOT NULL , `sID` VARCHAR(10) NOT NULL , `name` VARCHAR(100) NOT NULL , `address` VARCHAR(100) NULL , `phone` VARCHAR(20) NOT NULL , `email` VARCHAR(100) NOT NULL , PRIMARY KEY (`spID`),  UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest table",
    query: "CREATE TABLE `olympic`.`contest` ( `contestID` VARCHAR(10) NOT NULL , `start` DATE NOT NULL , `stop` DATE NOT NULL , `fee` VARCHAR(20) NOT NULL,  PRIMARY KEY (`contestID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - subject table",
    query: "CREATE TABLE `olympic`.`contestSubject` ( `contestID` VARCHAR(10) NOT NULL , `subjectID` VARCHAR(10) NOT NULL, PRIMARY KEY (`contestID`, `subjectID`)) ENGINE = InnoDB;"
  },{
    name: "Create subject table",
    query: "CREATE TABLE `olympic`.`subject` ( `subjectID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , PRIMARY KEY (`subjectID`)) ENGINE = InnoDB;"
  },{
    name: "Create prize table",
    query: "CREATE TABLE `olympic`.`prize` ( `prizeID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , `content` VARCHAR(100) NULL , PRIMARY KEY (`prizeID`)) ENGINE = InnoDB;"
  },{
    name: "Create organizing location table",
    query: "CREATE TABLE `olympic`.`orgLocation` ( `orgLocationID` VARCHAR(10) NOT NULL , `name` VARCHAR(100) NOT NULL , `address` VARCHAR(200) NOT NULL , PRIMARY KEY (`orgLocationID`)) ENGINE = InnoDB;"
  },{
    name: "Create room table",
    query: "CREATE TABLE `olympic`.`room` ( `roomID` VARCHAR(10) NOT NULL , `orgLocationID` VARCHAR(10) NOT NULL ,`name` VARCHAR(50) NOT NULL , PRIMARY KEY (`roomID`)) ENGINE = InnoDB;"
  },{
    name: "Create candidate table",
    query: "CREATE TABLE `olympic`.`candidate`(`cID` VARCHAR(10) NOT NULL, `accountID` VARCHAR(10) NOT NULL , `address` VARCHAR(200) NOT NULL, `sID` VARCHAR(10) NOT NULL, `name` VARCHAR(50) NOT NULL, `phone` VARCHAR(20) NOT NULL, `email` VARCHAR(100) NOT NULL, `CMT` VARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL  ,  `dob` DATETIME NOT NULL, PRIMARY KEY(`cID`), UNIQUE (`accountID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create report card table",
    query: "CREATE TABLE `olympic`.`reportCard` ( `reportCardID` VARCHAR(10) NOT NULL , `mark` REAL NOT NULL , `subjectID` VARCHAR(10) NOT NULL , `contestID` VARCHAR(10) NOT NULL , `candidateID` VARCHAR(10) NOT NULL , PRIMARY KEY (`reportCardID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - room table",
    query: "CREATE TABLE `olympic`.`contestRoom` ( `roomID` VARCHAR(10) NOT NULL , `subjectID` VARCHAR(10) NOT NULL , `supervisoryID` VARCHAR(10) NOT NULL , PRIMARY KEY (`roomID`, `subjectID`)) ENGINE = InnoDB;"
  }, {
    name: "Create supervisory table",
    query: "CREATE TABLE `olympic`.`supervisory` ( `sID` VARCHAR(10) NOT NULL , `supervisoryID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , `email` VARCHAR(100) NOT NULL , `phone` VARCHAR(20) NOT NULL , `address` VARCHAR(200) NOT NULL , PRIMARY KEY (`sID`), UNIQUE (`supervisoryID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - candidate table",
    query: "CREATE TABLE `olympic`.`contestCandidate`(`cID` VARCHAR(10) NOT NULL, `contestID` VARCHAR(10) NOT NULL, `participantID` VARCHAR(10) not null ,`candidateID` VARCHAR(10) NOT NULL, PRIMARY KEY(`cID`, `contestID`)) ENGINE = InnoDB;"
  }

];

const queryController = (util, db) => new Promise((res, rej) => {
  db.query(util.query, (err, results, fields) => {
    if (err) {
      rej(util.name + " failed! " + err);
    } else {
      res(util.name + " Success!");
    }

  });
});

const dbGenerator = (() => {
  initializeDb().then(db => {
    Promise.all(dbUtils.map(util => queryController(util, db)))
      .then((reses) => {
        for (let res of reses)
          console.log(res);
        db.destroy();
      })
      .catch(err => {
        console.log(err);
      })
  }).catch(err => {
    console.log("Cannot initialize DB: ");
    console.log(err);
  })
})();
