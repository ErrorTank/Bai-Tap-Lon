var db = require('mysql');

const subjectSql = {
    insert: function(subjectID, name){

        var sql=   `INSERT INTO subject (subjectID, name) 
                    VALUES(${subjectID}, ${name})`;

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
                    FROM subject`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(subjectID){

        var sql =  `DELETE FROM subject 
                    WHERE subjectID = ${subjectID}`;
                    
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

    update: function(subjectID, name){

        var sql =  `UPDATE User 
                    SET name = ${name} 
                    WHERE subjectID = ${subjectID}`;
        
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
module.exports = subjectSql;