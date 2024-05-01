const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.post('/start', (req, res)=>{
    console.log(req.body);
    res.json({success : true})
})

PORT = 8000
app.listen(PORT, ()=>{
    console.log("server started");
})