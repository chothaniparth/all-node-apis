const express = require('express');
// const mongoose = require('mongoose');
const {PORT, mongoURL} = require('./common/variable')
const {connectDB} = require('./connectDB')
const router = require('./routers/router')
const app = express();

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`);
})