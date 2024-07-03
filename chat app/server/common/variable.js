const dotenv = require('dotenv');
dotenv.config();
const { LIVE_URL, PORT, secretKey, SQLServereName, DatabaseNamw, User, Password } = process.env;

module.exports = {
    LIVE_URL, 
    PORT, 
    secretKey, 
    SQLServereName, 
    DatabaseNamw, 
    User,
    Password
}