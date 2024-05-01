const express = require('express');
const app = express();
const sql = require("mssql/msnodesqlv8");
const {DB_connection} = require('./DB_connection');
const userRoute = require('./router/routes')
const PORT = 8000

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// DB_connection()

app.use('/', userRoute)

app.listen(PORT, console.log('server started'));