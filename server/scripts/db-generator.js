const initializeDb = require("../config/db");

const dbUtils = [{
    name: "Create Account table",
    query: "CREATE TABLE `olympic`.`Account` ( `accountID` NVARCHAR(10) NOT NULL ,  `username` NVARCHAR(50) NOT NULL , `password` NVARCHAR(50) NOT NULL , `role` INT(11) NOT NULL , `canLogin` BOOLEAN NOT NULL , PRIMARY KEY (`accountID`), UNIQUE (`username`)) ENGINE = InnoDB;"
  }, {
    name: "Create User Table",
    query: "CREATE TABLE `olympic`.`User` ( `userID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `CMT` NVARCHAR(20) NOT NULL , `address` NVARCHAR(200) NULL , `phone` NVARCHAR(50) NULL , `email` NVARCHAR(50) NOT NULL , `accountID` NVARCHAR(10) NOT NULL , `employeeID` NVARCHAR(10) NOT NULL , `gender` INT(1) NOT NULL , PRIMARY KEY (`userID`), UNIQUE (`email`), UNIQUE (`accountID`), UNIQUE (`employeeID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create pending candidate Table",
    query: "CREATE TABLE `olympic`.`registrationcandidate`(`rcID` NVARCHAR(10) NOT NULL,  `address` NVARCHAR(200) NOT NULL, `sID` NVARCHAR(10) NOT NULL, `name` NVARCHAR(50) NOT NULL, `phone` NVARCHAR(20) NOT NULL, `email` NVARCHAR(100) NOT NULL, `contestID` NVARCHAR(10) NULL, `CMT` NVARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL  , `username` NVARCHAR(50) NULL  ,  `dob` DATETIME NOT NULL, PRIMARY KEY(`rcID`)) ENGINE = InnoDB;"
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
    query: "CREATE TABLE `olympic`.`schoolPresenter` ( `spID` NVARCHAR(10) NOT NULL , `accountID` NVARCHAR(10) NOT NULL, `sID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(100) NOT NULL , `address` NVARCHAR(100) NULL , `phone` NVARCHAR(20) NOT NULL , `email` NVARCHAR(100) NOT NULL , PRIMARY KEY (`spID`), UNIQUE (`accountID`),  UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create prizeimg table",
    query: "CREATE TABLE `olympic`.`prizeimg` ( `imgID` NVARCHAR(10) NOT NULL , `link` NVARCHAR(200) NOT NULL , `prizeID` NVARCHAR(10) NOT NULL, PRIMARY KEY (`imgID`)) ENGINE = InnoDB;"
  }, {
    name: "Create subject table",
    query: "CREATE TABLE `olympic`.`subject` ( `subjectID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `content` NVARCHAR(200) NULL, PRIMARY KEY (`subjectID`)) ENGINE = InnoDB;"
  }, {
    name: "Create prize table",
    query: "CREATE TABLE `olympic`.`prize` ( `prizeID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `content` NVARCHAR(100) NULL , PRIMARY KEY (`prizeID`)) ENGINE = InnoDB;"
  }, {
    name: "Create organizing location table",
    query: "CREATE TABLE `olympic`.`orgLocation` ( `orgLocationID` NVARCHAR(10) NOT NULL ,`phone` NVARCHAR(20) NOT NULL, `name` NVARCHAR(100) NOT NULL , `address` NVARCHAR(200) NOT NULL , PRIMARY KEY (`orgLocationID`)) ENGINE = InnoDB;"
  }, {
    name: "Create room table",
    query: "CREATE TABLE `olympic`.`room` ( `roomID` NVARCHAR(10) NOT NULL , `orgLocationID` NVARCHAR(10) NOT NULL ,`name` NVARCHAR(50) NOT NULL , `locate` NVARCHAR(200) NOT NULL , `maxSeat` INT(3) NOT NULL , PRIMARY KEY (`roomID`)) ENGINE = InnoDB;"
  }, {
    name: "Create candidate table",
    query: "CREATE TABLE `olympic`.`candidate`(`cID` NVARCHAR(10) NOT NULL, `accountID` NVARCHAR(10) NOT NULL , `address` NVARCHAR(200) NOT NULL, `sID` NVARCHAR(10) NOT NULL, `name` NVARCHAR(50) NOT NULL, `phone` NVARCHAR(20) NOT NULL, `email` NVARCHAR(100) NOT NULL, `CMT` NVARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL  ,  `dob` DATETIME NOT NULL, PRIMARY KEY(`cID`), UNIQUE (`accountID`), UNIQUE (`CMT`), UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Create supervisor table",
    query: "CREATE TABLE `olympic`.`supervisor` (`supervisorID` NVARCHAR(10) NOT NULL , `name` NVARCHAR(50) NOT NULL , `email` NVARCHAR(100) NOT NULL , `phone` NVARCHAR(20) NOT NULL , `address` NVARCHAR(200) NOT NULL , PRIMARY KEY (`supervisorID`), UNIQUE (`email`)) ENGINE = InnoDB;"
  }, {
    name: "Insert schools",
    query: "INSERT INTO `school` (`sID`, `name`, `address`, `phone`, `email`) VALUES ('0', 'Đại học Thăng Long', '69 Nguyễn Xiển, Thanh Xuân, Hà Nội', '02438587346', 'info@thanglong.edu.vn'), ('1', 'Đại học Công Đoàn', '169 Tây Sơn, Đống Đa, Hà Nội', '02438573204', 'dhcongdoan@dhcd.edu.vn'), ('2', 'Đại học Bách Khoa Hà Nội', '01 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', '02438694242', 'bku@Gmail.com'), ('3', 'Học viện ngân hàng', '30 Chùa bộc, Đống Đa, Hà Nội', '02438521305', ' info@hvnh.edu.vn'), ('4', 'Học viện công nghệ bưu chính viễn thông', '02 Quang Trung, Hà Đông, Hà Nội', '01216457464', 'ptit@edu.com'), ('5', 'Trường Đại học Kinh tế Quốc dân', '207 Giải Phóng, Đồng Tâm, Quận Hai Bà Trưng, Hà Nội', '02436280280', 'cnttkt@neu.edu.vn'), ('6', 'Trường Đại học Điện lực', '235 Hoàng Quốc Việt, Từ Liêm, Hà Nội', '048362672', 'info@epu.edu.vn'), ('7', 'Trường Đại học Y Hà Nội', '01 Tôn Thất Tùng, Đống Đa, Hà Nội', '02438523798', 'daihocyhn@hmu.edu.vn'), ('8', 'Trường Đại học Giao Thông Vận Tải', '03 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội', '02437663311', 'dhgtvt@utc.edu.vn'), ('9', 'Trường Đại Học Hà Nội', 'Km 9, đường Nguyễn Trãi, quận Thanh Xuân, Hà Nội', '02438544338', 'hanu@hanu.edu.vn')"
  }, {
    name: "Create contest table",
    query: "CREATE TABLE `olympic`.`contest` (`contestID` NVARCHAR(10) NOT NULL , `contestName` NVARCHAR(50) NOT NULL , `subjectID` NVARCHAR(10) NOT NULL , `fee` DECIMAL(20) NOT NULL , `orgLocationID` NVARCHAR(10) NOT NULL , `content` NVARCHAR(200) NULL , `canSeeResult` BOOLEAN NOT NULL , PRIMARY KEY (`contestID`)) ENGINE = InnoDB;"
  }, {
    name: "Create examDate table",
    query: "CREATE TABLE `olympic`.`examDate` (`examDateID` NVARCHAR(10) NOT NULL , `start` DATETIME NOT NULL ,`stop` DATETIME NOT NULL, `content` NVARCHAR(200) NULL , `contestID` NVARCHAR(10) NOT NULL , `roomID` NVARCHAR(10) NOT NULL ,  PRIMARY KEY (`examDateID`)) ENGINE = InnoDB;"
  }, {
    name: "Create examDate - candidate table",
    query: "CREATE TABLE `olympic`.`examDatecandidate`(`examDateID` VARCHAR(10) NOT NULL, `candidateID` VARCHAR(10) NOT NULL, `SBD` VARCHAR(10) NOT NULL, PRIMARY KEY(`examDateID`, `candidateID`)) ENGINE = InnoDB;"
  }, {
    name: "Create examDate - supervisor table",
    query: "CREATE TABLE `olympic`.`examDatesupervisor` (`examDateID` NVARCHAR(10) NOT NULL , `supervisorID` NVARCHAR(10) NOT NULL , PRIMARY KEY (`examDateID`,`supervisorID`)) ENGINE = InnoDB;"
  }, {
    name: "Create reportCard table",
    query: "CREATE TABLE `olympic`.`reportCard` (`rID` NVARCHAR(10) NOT NULL , `candidateID` NVARCHAR(10) NOT NULL ,`contestID` NVARCHAR(10) NOT NULL , `mark` REAL NOT NULL , PRIMARY KEY (`rID`)) ENGINE = InnoDB;"
  }, {
    name: "Create prize - contest table",
    query: "CREATE TABLE `olympic`.`prizecontest` (`prizeID` NVARCHAR(10) NOT NULL ,`contestID` NVARCHAR(10) NOT NULL , `max` INT(20) NOT NULL , `content` NVARCHAR(100) NULL , PRIMARY KEY (`prizeID`,`contestID`)) ENGINE = InnoDB;"
  },

  //create db info
  {
    name: "Insert subjects",
    query: "INSERT INTO `subject` (`subjectID`, `name`, `content`) VALUES ('1', 'Toán cao cấp', 'môn toán ?'), ('2', 'Triết học', 'môn triết học ?'), ('3', 'Đường lối cách mạng', 'môn đường lối ?'), ('4', 'Tin học', 'môn tin ?'), ('5', 'Giáo dục quốc phòng', 'môn giáo dục quốc phòng ?'), ('6', 'Cờ vua', 'môn cờ vua ?'), ('7', 'Bóng chuyền', 'môn bóng chuyền ?'), ('8', 'Bóng đá', 'môn bóng đá ?')"
  }, {
    name: "Insert locations",
    query: "INSERT INTO `orgLocation` (`orgLocationID`, `phone`, `name`, `address`) VALUES ('1', '02438587346', 'Trường đại học Thăng Long', '69 Nguyễn Xiển, Thanh Xuân, Hà Nội'), ('2', '0240924545', 'Đại học Ngoại Thương Hà Nội', '91 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội'), ('3', '0240931232', 'Đại học Kinh tế Quốc dân', '207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội'), ('4', '02438489293', 'Trung tâm huấn luyện và thi đấu TDTT Hà Nội', 'Nguyễn Cơ Thạch, P. Mỹ Đình 2, Q. Nam Từ Liêm, Hà Nội'), ('5', '02438587346', 'Trường Đại Học Sư Phạm Hà Nội', 'Số 136 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội')"
  },
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