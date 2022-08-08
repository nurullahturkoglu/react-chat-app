const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  try {
    const newUser = new Message({
        conversationId:req.body.conversationId,
        senderId:req.body.senderId,
        text:req.body.text
    })

    newUser.save();
   
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get("/:conversationId",async (req,res) => {
  try {
    const messages = await Message.find({conversationId : req.params.conversationId});
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;