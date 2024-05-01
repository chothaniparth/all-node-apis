const sql = require('mssql/msnodesqlv8');

const config = {
    server : 'FLUTTER3\\SQLEXPRESS',
    database: 'testing',
    driver : 'msnodesqlv8',
    user : 'parth',
    password : '1234',
    options: {
        trustedConnection : true
    }
  };
  
async function connection() {
    try {
        const result = await sql.connect(config);
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection error:', error);
    }
}

module.exports = { connection };


