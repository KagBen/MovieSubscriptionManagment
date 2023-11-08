const mongoose = require("mongoose")
require("dotenv").config()

const mongoosePath = process.env.MONGODB_PATH  || 'mongodb://localhost:27017/cinemaManagmentSubscription'

const ConectDB = () => {
    mongoose.connect(mongoosePath).then(() => {
        console.log("Connect to Cinema Managment data base.")
    }).catch(err => console.log(err))

}

module.exports = ConectDB