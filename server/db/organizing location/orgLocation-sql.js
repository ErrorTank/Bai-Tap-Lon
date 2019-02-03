var db = require('mysql');

const orgLocationSql = {
    insert: function(orgLocationID, name, address){

        var sql=   `INSERT INTO orgLocation (orgLocationID, name, address) 
                    VALUES(${orgLocationID}, ${name}, ${address})`;

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
                    FROM orgLocation`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(orgLocationID){

        var sql =  `DELETE FROM orgLocation 
                    WHERE orgLocationID = ${orgLocationID}`;
                    
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

    update: function(orgLocationID, name, address){

        var sql =  `UPDATE User 
                    SET name = ${name}, address = ${address} 
                    WHERE orgLocationID = ${orgLocationID}`;
        
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