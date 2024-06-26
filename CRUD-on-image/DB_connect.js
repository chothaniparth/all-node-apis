const sql = require('mssql/msnodesqlv8');
const server = 'FLUTTER3\\SQLEXPRESS'
const config = {
    server : server,
    database : 'images_crud',
    driver : 'msnodesqlv8' ,
    options : {
        trustedConnection : true
    } 
};

const DB_connect = async ()=>{
    try{
        const DB_connect_responsse = await sql.connect(config);
            console.log('DB connected');
    }catch(error){
        console.log('DB connection error :', error);
    }
}

module.exports = {
    DB_connect
}