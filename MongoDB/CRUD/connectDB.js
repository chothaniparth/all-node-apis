const mongoose = require('mongoose');
const {mongoURL} = require('./common/variable')

const connectDB = ()=>{
    mongoose.connect(mongoURL).then(() => {
        console.log('Connected to MongoDB database');
    }).catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
}

module.exports = {connectDB}