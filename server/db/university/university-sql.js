const accountSql = {
    insert: function(accountID, username, password, role, email){

        var sql=   `INSERT INTO Account (accountID, username, password, email, role) 
                    VALUES(${accountID}, ${username}, ${password}, ${email}, ${role})`;

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
                    FROM Account`;

        return new Promise(function(resolve, reject){
            db.query(sql, function(err, result){
                if(err)
                    throw err;
                else
                    resolve(result);
            });
        });
    },

    delete: function(accountID){

        var sql =  `DELETE FROM Account 
                    WHERE accountID = ${accountID}`;
                    
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

    update: function(accountID, username, password, role, email){

        var sql =  `UPDATE Account 
                    SET username = ${username}, password = ${password}, role = ${role}, email = ${email} 
                    WHERE accountID = ${accountID}`;
        
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
module.exports = accountSql;