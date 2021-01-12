const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { userAuth } = require("../utils/auth");
const {
  User,
  Conversation,
  User_Conversation,
  Message,
} = require("../db/models");
const conversation = require("../db/models/conversation");

const serverErrorHandler = (msg, res) => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

// @route       POST api/conversations
// @desc        Create new conversation
// @access      Authenticated
router.post(
  "/",
  [
    userAuth,
    [
      check(
        "participants",
        "Participants ID's must be included in body"
      ).notEmpty(),
    ],
  ],
  async function (req, res) {
    // validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    const { participants } = req.body;

    try {
      // find user to make sure they exist
      const convoCreator = await User.findOne({
        where: { id: req.user.id },
      });
      if (!convoCreator) {
        return res.status(400).json({
          msg: "User not found",
          success: false,
        });
      }

      // create conversation
      const convo = await Conversation.create({ createdBy: convoCreator.id });

      // prepare to add participants
      participants.push(convoCreator.id); // include conversation creator as a participant

      // format data to be inserted
      const userConversationData = participants.map(participant => ({
        userId: participant,
        conversationId: convo.id,
      }));

      // add participants
      await User_Conversation.bulkCreate(userConversationData);

      // find conversation and return it
      const results = await Conversation.findOne({
        where: { id: convo.id },
        include: { model: User, as: "participants" },
      });

      // return results
      return res.status(200).json({
        success: true,
        message: "Conversation successfully created",
        results,
      });
    } catch (err) {
      return serverErrorHandler("SERVER ERROR: could create conversation", res);
    }
  }
);

// @route       GET api/conversations
// @desc        get all conversations (of user requesting)
// @access      Authenticated
router.get("/", userAuth, async (req, res) => {
  try {
    const results = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Conversation,
          as: "conversations",
          // just return last message for frontend
          include: {
            model: Message,
            limit: 1,
            order: [["createdAt", "DESC"]],
            include: User,
          },
        },
      ],
    });
    // return results
    return res.status(200).json({
      success: true,
      message: "Conversations found",
      results,
    });
  } catch (err) {
    return serverErrorHandler(
      "SERVER ERROR: could not find all conversations",
      res
    );
  }
});

// @route       GET api/conversations/:id
// @desc        get one conversations (of user requesting)
// @access      Authenticated
router.get("/:id", userAuth, async (req, res) => {
  try {
    const results = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Conversation,
          as: "conversations",
          where: { id: req.params.id },
          include: { model: Message, include: User },
        },
      ],
    });
    // return results
    return res.status(200).json({
      success: true,
      message: "Conversation found",
      results,
    });
  } catch (err) {
    return serverErrorHandler("SERVER ERROR: could not find conversation", res);
  }
});

// @route       DELETE api/conversations/:id
// @desc        delete a conversation
// @access      Authenticated
router.delete("/:id", userAuth, (req, res) => {
  try {
    conversation.destroy({
      where: { id: req.params.id, createdBy: req.user.id },
    });
    return res.status(200).json({
      success: true,
      message: "Conversation deleted",
    });
  } catch (err) {
    return serverErrorHandler(
      "SERVER ERROR: could not delete conversation",
      res
    );
  }
});

module.exports = router;
