const mongoose = require("mongoose");

const Message = new mongoose.Schema({

    conversationId:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model("Message", Message);
