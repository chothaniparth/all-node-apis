// db.js
const sql = require('mssql');

const config = {
    user: 'parth',
    password: '1234',
    server: 'FLUTTER3\\SQLEXPRESS',
    database: 'your_database_name',
    options: {
        trustServerCertificate: true
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
