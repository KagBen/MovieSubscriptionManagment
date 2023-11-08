const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    MemberId: Schema.Types.ObjectId,
    Movies: [{MovieId : Schema.Types.ObjectId, Date : Date}]
}, {
    versionKey: false
})

const Subscription = mongoose.model("subscription",  subscriptionSchema  , "subscriptions")

module.exports = Subscription