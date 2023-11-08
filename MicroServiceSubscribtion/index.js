const express = require("express")
require("dotenv").config()
const cors = require('cors')
const ConectDB = require("./Config/ConectDB.js")
const port = process.env.PORT || 3002

const app = express()

ConectDB()

app.use(cors())
app.use(express.json())


app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})