const {DB_connection} = require('../DB_connection');
const sql = require("mssql/msnodesqlv8");

DB_connection();

const request = new sql.Request();

function fetchUser (req, res){
    const query = `select * from users where id = ${req.body.id}`
    request.query(query, (err, result)=>{
        if(err){
            console.log('retrive data :', err);
            return res.json({success : false, result : 'error'})
        } else {
            console.log("result :", result);
            if(result.recordset.length === 0){
                console.log(result.recordset);
                return res.json({success : false, msg : 'id dont exists'})
            }
            return res.json({success : true, result : result.recordset})
        } 
    })
}

function addUser (req, res){
    const quary1 = `select * from users where id = ${req.body.id}`;
    request.query(quary1, (error, result1)=>{
        if(error){
            console.log('add user check error :', error);
            res.json({success : false, msg : 'system error'})
        } else if(result1.recordset.length > 0){
            console.log('length :',result1.recordset);
            res.json({success : false, msg : 'id already exists'});
        }else{
            const quary2 = `insert into users (id, userName) values ('${req.body.id}', '${req.body.userName}')`
            request.query(quary2, (err, result)=>{
                if(err){
                    console.log(err);
                    return res.json({success : false, msg : 'error in saving data'});
                }else {
                    console.log(result);
                    console.log('length :',result1.recordset);
                    return res.json({success : true, msg : 'new user created'});
                }
            })        
        }
    })
}

function deleteUser (req, res){
    console.log('id :', req.body.id);
    const quary = `delete from users where id = ${req.body.id}`
    request.query(quary, (err, result)=>{
        if(err){
            console.log(err);
            return res.json({success : false, msg : 'error in saving data'});
        }else {
            console.log('delete result :', result);
            if(result.rowsAffected[0] === 0){
                return res.json({success : false, msg : 'id dont exists'})
            }
            return res.json({success : true, msg : 'user id deleted sucessfully'});
        }
    })
}

function updateUser (req, res){
    console.log('body :', req.body);
    const quary = `update users set userName = '${req.body.userName}' where id = ${req.body.id}`
    request.query(quary, async (err, result)=>{
        if(err){
            console.log(err);
            return res.json({success : false, msg : 'error in edit user'});
        } else {
            console.log('edit result :', result);
            if(result.rowsAffected[0] === 0){
                return res.json({success : false, msg : 'id dont exists'})
            }
            return res.json({success : true, msg : 'successfully edited user data'});
        }
    })
}

module.exports = {fetchUser, addUser, deleteUser, updateUser};