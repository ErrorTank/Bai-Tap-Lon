var db = require('mysql');

const contestSql = {
    insert: function(contestID, start, stop, fee, subjectID){

        var sql=   `INSERT INTO Contest (contestID, start, stop, fee, subjectID) 
                    VALUES(${contestID}, ${start}, ${stop}, ${fee}, ${subjectID})`;

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
                    FROM Contest`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(contestID){

        var sql =  `DELETE FROM Contest 
                    WHERE contest = ${contestID}`;
                    
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

    update: function(contestID, start, stop, fee, subjectID){

        var sql =  `UPDATE Contest 
                    SET start = ${start}, stop = ${stop}, fee = ${fee}, subjectID = ${subjectID} 
                    WHERE contestID = ${contestID}`;
        
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
module.exports = contestSql;