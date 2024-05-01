const sql = require('mssql/msnodesqlv8');
const {connection} = require('../DB_connect')
connection()

const request = new sql.Request();

const check = async (req, res)=>{
    const quary = ' select * from users'
    request.query(quary, async (error, result)=>{
        if(error){
            console.log(error);
            return res.json({success : false})
        }else{
            console.log(result);
            return res.json({success : true})
        }
    })
}

async function uploadUser(req, res){
    const {userName, email, password} = req.body;
    const quary1 = `select * from users where email = '${email}'`;
    await request.query(quary1, async (error, result1)=>{
        if(error){
            console.log('add user check error :', error);
            res.json({success : false, msg : 'server error, try again later.'})
        } else if(result1.recordset.length > 0){
            res.json({success : false, msg : 'invelid credentials'});
        }else{
            const quary2 = `insert into users (userName, email, userPassword) values ('${userName}', '${email}', '${password}')`
            await request.query(quary2, (err, result)=>{
                if(err){
                    console.log(err);
                    return res.json({success : false, msg : 'error in saving data'});
                }else {
                    return res.json({success : true, msg : 'new user created'});
                }
            })        
        }
    })
}
function fetchUser(req, res){
    const {email} = req.body;
    const query = `select * from users where email = '${email}'`
    request.query(query, (err, result)=>{
        if(err){
            console.log('retrive data :', err);
            return res.json({success : false, result : 'error'})
        } else {
            console.log("result :", result);
            if(result.recordset.length === 0){
                console.log(result.recordset);
                return res.json({success : false, msg : 'invelid credientials'})
            }
            return res.json({success : true, result : result.recordset})
        } 
    })
}

function removeUser(req, res){
    const {email} = req.body
    const quary = `delete from users where email = '${email}'`
    request.query(quary, (err, result)=>{
        if(err){
            console.log(err);
            return res.json({success : false, msg : 'server error, try again later.'});
        }else {
            if(result.rowsAffected[0] === 0){
                return res.json({success : false, msg : 'invelid credentials'})
            }
            return res.json({success : true, msg : 'user id deleted sucessfully'});
        }
    })
}

function updateUser(req, res){
    const {email, password, userName} = req.body;
    const quary = `update users set userName = '${userName}', userPassword = '${password}' where email = '${email}'`
    request.query(quary, async (err, result)=>{
        if(err){
            console.log(err);
            return res.json({success : false, msg : 'server error, try again later'});
        } else {
            console.log('edit result :', result);
            if(result.rowsAffected[0] === 0){
                return res.json({success : false, msg : 'invelid credentials'})
            }
            return res.json({success : true, msg : 'successfully edited user.'});
        }
    })
}

module.exports = {
    check,
    fetchUser,
    uploadUser,
    removeUser,
    updateUser
}