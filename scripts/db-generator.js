const initializeDb = require("../server/config/db");

const dbUtils = [
   {
    name: "Create Account table",
    query: "CREATE TABLE `olympic`.`Account` ( `accountID` VARCHAR(10) NOT NULL , `email` VARCHAR(50) NOT NULL , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , `role` INT(11) NOT NULL , `canLogin` BOOLEAN NOT NULL , PRIMARY KEY (`accountID`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB;"
  }, {
    name: "Create User Table",
    query: "CREATE TABLE `olympic`.`User` ( `userID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , `address` VARCHAR(200) NULL , `phone` VARCHAR(50) NULL , `email` VARCHAR(50) NOT NULL , `accountID` VARCHAR(10) NOT NULL , `employeeID` VARCHAR(10) NOT NULL , `CMT` VARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL , PRIMARY KEY (`userID`), UNIQUE (`email`), UNIQUE (`accountID`), UNIQUE (`employeeID`), UNIQUE (`CMT`)) ENGINE = InnoDB;"
  }, {
    name: "Create Admin",
    query: "INSERT INTO `account` (`accountID`, `email`, `username`, `password`, `role`, `canLogin`) VALUES ('1', 'kappa@gmail.com', 'kappa', '123123qwe', '0', '1');"
  }, {
    name: "Create Admin info",
    query: "INSERT INTO `user` (`userID`, `name`, `address`, `phone`, `email`, `accountID`, `employeeID`, `CMT`, `gender`) VALUES ('1', 'Kappa', 'No fucking where', '0123456789', 'kappa@gmail.com', '1', '1', '123456', '0');"
  }
];

const queryController = (util, db) => new Promise((res, rej) => {
  db.query(util.query, (err, results, fields) => {
    if(err) {
      rej(util.name+ " failed! " + err);
    }else{
      res(util.name+ " Success!");
    }

  });
});

const dbGenerator = (() => {
  initializeDb().then(db => {
    Promise.all(dbUtils.map(util => queryController(util, db)))
      .then((reses) => {
        for(let res of reses)
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
