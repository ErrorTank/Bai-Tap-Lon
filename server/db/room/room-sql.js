var db = require('mysql');

const roomSql = {
    insert: function(roomID, orgLocationID){

        var sql=   `INSERT INTO room (roomID, orgLocationID) 
                    VALUES(${roomID}, ${orgLocationID})`;

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
                    FROM room`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(roomID){

        var sql =  `DELETE FROM room 
                    WHERE roonID = ${roomID}`;
                    
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

    update: function(roomID, orgLocationID){

        var sql =  `UPDATE User 
                    SET name = ${name}, address = ${address} 
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
module.exports = roomSql;