const express = require("express")
require("dotenv").config()
const cors = require('cors')
const ConnectDB = require("./Config/ConnectDB.js")
const port = process.env.PORT || 3002 //create env ... "3002"
 
const app = express()

ConnectDB()

app.use(cors())
app.use(express.json())


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})