var db = require('mysql');

const userSql = {
    insert: function(userID, name, address, phone, email, accountID, employeeID, CMT, gender){

        var sql=   `INSERT INTO User (userID, name, address, phone, email, accountID, employeeID, CMT, gender) 
                    VALUES(${userID}, ${name}, ${address},${phone}, ${email}, ${accountID}, ${employeeID}, ${CMT}, ${gender})`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else{
                    resolve(result);
                }
            });
        });
    },

    read: function(){

        var sql=   `SELECT * 
                    FROM User`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(userID){

        var sql =  `DELETE FROM User 
                    WHERE userID = ${userID}`;
                    
        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else{
                    resolve(result);
                }
            });
        });
    },

    update: function(userID, name, address, phone, email, accountID, employeeID, CMT, gender){

        var sql =  `UPDATE User 
                    SET name = ${name}, address = ${address}, phone = ${phone}, email = ${email}, accountID = ${accountID}, employeeID = ${employeeID}, CMT = ${CMT}, gender = ${gender} 
                    WHERE userID = ${userID}`;
        
        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else{
                     resolve(result);
                }
            });
        });
    }    
}
module.exports = userSql;