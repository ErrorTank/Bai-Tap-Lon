const initializeDb = require("../config/db");

const dbUtils = [
  {
    name: "Create Account table",
    query: "CREATE TABLE `olympic`.`Account` ( `accountID` NVARCHAR(10) NOT NULL ,  `username` NVARCHAR(50) NOT NULL , `password` NVARCHAR(50) NOT NULL , `role` INT(11) NOT NULL , `canLogin` BOOLEAN NOT NULL , PRIMARY KEY (`accountID`), UNIQUE (`username`)) ENGINE = InnoDB;"
  }, {
    name: "Create User Table",
    query: "CREATE TABLE `olympic`.`User` ( `userID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `CMT` NVARCHAR(20) NOT NULL , `address` NVARCHAR(200) NULL , `phone` NVARCHAR(50) NULL , `email` NVARCHAR(50) NOT NULL , `accountID` NVARCHAR(10) NOT NULL , `employeeID` NVARCHAR(10) NOT NULL , `gender` INT(1) NOT NULL , PRIMARY KEY (`userID`), UNIQUE (`email`), UNIQUE (`accountID`), UNIQUE (`employeeID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create Admin",
    query: "INSERT INTO `account` (`accountID`,  `username`, `password`, `role`, `canLogin`) VALUES ('1',  'kappa2', '123123qwe', '0', '1');"
  }, {
    name: "Create Admin info",
    query: "INSERT INTO `user` (`userID`, `name`, `address`, `phone`, `email`, `accountID`, `employeeID`, `CMT`, `gender`) VALUES ('1', 'Kappa', 'No fucking where', '0123456789', 'kappa@gmail.com', '1', '1', '123456', '0');"
  }, {
    name: "Create school table",
    query: "CREATE TABLE `olympic`.`school` ( `sID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(100) NOT NULL , `address` NVARCHAR(100) NOT NULL , `phone` NVARCHAR(20) NOT NULL , `email` NVARCHAR(100) NOT NULL , PRIMARY KEY (`sID`), UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create school presenter table",
    query: "CREATE TABLE `olympic`.`schoolPresenter` ( `spID` NVARCHAR(10) NOT NULL , `sID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(100) NOT NULL , `address` NVARCHAR(100) NULL , `phone` NVARCHAR(20) NOT NULL , `email` NVARCHAR(100) NOT NULL , PRIMARY KEY (`spID`),  UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest table",
    query: "CREATE TABLE `olympic`.`contest` ( `contestID` NVARCHAR(10) NOT NULL , `start` DATE NOT NULL , `stop` DATE NOT NULL , `fee` NVARCHAR(20) NOT NULL,  PRIMARY KEY (`contestID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - subject table",
    query: "CREATE TABLE `olympic`.`contestSubject` ( `contestID` NVARCHAR(10) NOT NULL , `subjectID` NVARCHAR(10) NOT NULL, PRIMARY KEY (`contestID`, `subjectID`)) ENGINE = InnoDB;"
  },{
    name: "Create subject table",
    query: "CREATE TABLE `olympic`.`subject` ( `subjectID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , PRIMARY KEY (`subjectID`)) ENGINE = InnoDB;"
  },{
    name: "Create prize table",
    query: "CREATE TABLE `olympic`.`prize` ( `prizeID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `content` NVARCHAR(100) NULL , PRIMARY KEY (`prizeID`)) ENGINE = InnoDB;"
  },{
    name: "Create organizing location table",
    query: "CREATE TABLE `olympic`.`orgLocation` ( `orgLocationID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(100) NOT NULL , `address` NVARCHAR(200) NOT NULL , PRIMARY KEY (`orgLocationID`)) ENGINE = InnoDB;"
  },{
    name: "Create room table",
    query: "CREATE TABLE `olympic`.`room` ( `roomID` NVARCHAR(10) NOT NULL , `orgLocationID` NVARCHAR(10) NOT NULL ,`name` NVARCHAR(50) NOT NULL , PRIMARY KEY (`roomID`)) ENGINE = InnoDB;"
  },{
    name: "Create candidate table",
    query: "CREATE TABLE `olympic`.`candidate`(`cID` NVARCHAR(10) NOT NULL, `accountID` NVARCHAR(10) NOT NULL , `address` NVARCHAR(200) NOT NULL, `sID` NVARCHAR(10) NOT NULL, `name` NVARCHAR(50) NOT NULL, `phone` NVARCHAR(20) NOT NULL, `email` NVARCHAR(100) NOT NULL, `CMT` NVARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL  ,  `dob` DATETIME NOT NULL, PRIMARY KEY(`cID`), UNIQUE (`accountID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create report card table",
    query: "CREATE TABLE `olympic`.`reportCard` ( `reportCardID` NVARCHAR(10) NOT NULL , `mark` REAL NOT NULL , `subjectID` NVARCHAR(10) NOT NULL , `contestID` NVARCHAR(10) NOT NULL , `candidateID` NVARCHAR(10) NOT NULL , PRIMARY KEY (`reportCardID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - room table",
    query: "CREATE TABLE `olympic`.`contestRoom` ( `roomID` NVARCHAR(10) NOT NULL , `subjectID` NVARCHAR(10) NOT NULL , `supervisoryID` NVARCHAR(10) NOT NULL , PRIMARY KEY (`roomID`, `subjectID`)) ENGINE = InnoDB;"
  }, {
    name: "Create supervisory table",
    query: "CREATE TABLE `olympic`.`supervisory` ( `sID` NVARCHAR(10) NOT NULL , `supervisoryID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `email` NVARCHAR(100) NOT NULL , `phone` NVARCHAR(20) NOT NULL , `address` NVARCHAR(200) NOT NULL , PRIMARY KEY (`sID`), UNIQUE (`supervisoryID`)) ENGINE = InnoDB;"
  }, {
    name: "Create contest - candidate table",
    query: "CREATE TABLE `olympic`.`contestCandidate`(`cID` NVARCHAR(10) NOT NULL, `contestID` NVARCHAR(10) NOT NULL, `participantID` NVARCHAR(10) not null ,`candidateID` NVARCHAR(10) NOT NULL, PRIMARY KEY(`cID`, `contestID`)) ENGINE = InnoDB;"
  }, {
    name: "Insert schools",
    query: "INSERT INTO `school` (`sID`, `name`, `address`, `phone`, `email`) VALUES ('2', 'Đại học Bách Khoa Hà Nội', '01 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', '0212135', 'bku@Gmail.com'), ('3', 'Học viện ngân hàng', '30 Chùa bộc, Đống Đa, Hà Nội', '132133', 'banking@gmail.com'), ('4', 'Học viện công nghệ bưu chính viễn thông', '02 Quang Trung, Hà Đông, Hà Nội', '01216457464', 'ptit@edu.com')"
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
