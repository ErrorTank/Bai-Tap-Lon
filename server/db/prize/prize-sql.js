var db = require('mysql');

const prizeSql = {
    insert: function(prizeID, name, content){

        var sql=   `INSERT INTO prize (prizeID, name, content) 
                    VALUES(${prizeID}, ${name}, ${content})`;

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
                    FROM prize`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(prizeID){

        var sql =  `DELETE FROM prize 
                    WHERE prizeID = ${prizeID}`;
                    
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

    update: function(prizeID, name, content){

        var sql =  `UPDATE User 
                    SET name = ${name}, content = ${content}
                    WHERE prizeID = ${prizeID}`;
        
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
module.exports = prizeSql;