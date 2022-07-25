const Schema = require('mongoose').Schema;
const mongoose = require('mongoose')

const messageSchema = new Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, trim: true},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"}
},{
    timestamps: true
})