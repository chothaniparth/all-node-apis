const sql = require("mssql/msnodesqlv8");

const config = {
    server : 'FLUTTER3\\SQLEXPRESS',
    database : 'testing',
    driver : 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
}

async function DB_connection() {
    try {
        await sql.connect(config);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

module.exports = {
    DB_connection,
}