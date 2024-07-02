const sql = require('mssql/msnodesqlv8');

const config = {
    user: 'parth',
    password: '1234',
    server: 'FLUTTER3\\SQLEXPRESS',
    database: 'chatapp',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection : true
    }
  };

function initializePool(config) {
    return new sql.ConnectionPool(config);
}

// Initialize the pool with the initial configuration
let pool = initializePool(config);

async function connectToDatabase() {
    try {
        // Connect to the database
        await pool.connect();
        console.log('Connected to SQL Server');
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

module.exports = { sql, pool, connectToDatabase};