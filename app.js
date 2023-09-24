const express = require("express");

const hostname = "127.0.0.1";
const port = 3000;

const app = express()

app.get('/', (req, res)=>{
    res.status(200).send('Hello Word')
})


app.listen(port, ()=>{
    console.log(`App running on Port ${port}...`)
})