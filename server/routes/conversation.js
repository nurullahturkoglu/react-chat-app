const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");

router.post("/", async (req, res) => {
  try {
    const newUser = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userid", async (req, res) => {
  
    try {
    const findUser = await Conversation.find({
      members: { $in: req.params.userid },
    });

    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get/:conversationId", async (req, res) => {
  
  try {
  const findConversation = await Conversation.find({
    _id: req.params.conversationId ,
  });

  res.status(200).json(findConversation);
} catch (error) {
  res.status(500).json(error);
}
});


module.exports = router;
