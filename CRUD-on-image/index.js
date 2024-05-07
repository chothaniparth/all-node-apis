require('dotenv').config();
const express = require('express');
const userRoute = require('./routers/user');
const path = require('path');

const app = express();

// const {DB_connect} = require('./DB_connect');
// DB_connect();


app.use(express.json());
app.use(express.urlencoded({extended : false}));
// app.use(express.static('media'));

app.use(`/media`, express.static(path.join(__dirname, 'media')));
// app.use(express.static(path.join(__dirname, 'media')))

app.use('/', userRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`server started at ${PORT}`));