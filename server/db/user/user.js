var uniqid = require('uniquid');
var accountSql = require('account-sql');

class user {
    constructor(userID, name, address, phone, email, accountID, employeeID, CMT, gender)
    {
        this
    }
}
//userID, name, address, phone, email
"CREATE TABLE `olympic`.`User` ( `userID` VARCHAR(10) NOT NULL , `name` VARCHAR(50) NOT NULL , `address` VARCHAR(200) NULL , `phone` VARCHAR(50) NULL , `email` VARCHAR(50) NOT NULL , `accountID` VARCHAR(10) NOT NULL , `employeeID` VARCHAR(10) NOT NULL , `CMT` VARCHAR(20) NOT NULL , `gender` INT(1) NOT NULL , ;"