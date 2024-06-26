// db.js
const sql = require('mssql');

const config = {
    user: 'your_db_username',
    password: 'your_db_password',
    server: 'your_server_address',
    database: 'your_database_name',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
    });

module.exports = {
    sql, poolPromise
};
