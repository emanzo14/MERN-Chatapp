const mongoose = require('mongoose')
const Schema = require('mmongoose').Schema

const chatSchema = new Schema({
    chatName: {type: String, trim: true},
    isGroupChat: {type: Boolean, default: false},
    latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: "Message"},
    users: {type: Schema.Types.ObjectId, ref: "User"},
    groupAdmin: {type: Schema.Types.ObjectId, ref: "User"}

},{
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)