const express = require('express');
const userRouter = require('./router/user')
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', userRouter)

const PORT = 8000;
app.listen(PORT, ()=> console.log('server started'))