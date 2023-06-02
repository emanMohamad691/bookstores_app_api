const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const storeRoute=require("./route/store")
const bookRoute=require("./route/bookStore")
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use("/api/v2",storeRoute)
app.use("/api/v1",bookRoute)

app.listen(5000,()=>{
    console.log("server starting .......")
})