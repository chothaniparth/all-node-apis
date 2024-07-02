const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routers/route')
const {connectToDatabase} = require('./db')
const {PORT} = require('./common/variable')

const app = express();

app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase()
  .then(() => {

    console.log('Connected to the database successfully');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });



app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});