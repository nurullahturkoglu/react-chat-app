const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
var ObjectId = require('mongoose').Types.ObjectId;

// @desc Get conversationId from senderId & receiverId
// @route /conversation
// @access PUBLIC

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
// @desc set timestamp of conversation
// @route /conversation
// @access PUBLIC

router.post("/setUpdate", async (req, res) => {
  try {
    const { time, conversationId } = req.body;
    const user = await Conversation.findOneAndUpdate({ _id: new ObjectId(conversationId) },{updatedAt:time});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @desc Get user conversations from userId
// @route /conversation/id
// @access PUBLIC

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

// @desc Get conversation from conversationId
// @route /conversation/get/id
// @access PUBLIC

router.get("/get/:conversationId", async (req, res) => {
  try {
    const findConversation = await Conversation.find({
      _id: req.params.conversationId,
    });

    res.status(200).json(findConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
