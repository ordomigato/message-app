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

const serverErrorHandler = (msg, res) => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

const participantIdentifierCreator = (array) => {
  // process array and create unique identifier
  const string = array
    .sort((a, b) => a - b)
    .toString()
    .replace(/,/g, ":");
  return string;
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
      // add reqyestubg yser ti oartucuoabt arrat
      participants.push(req.user.id);

      // create unique identifier string based on participants' ID
      const convoIdentifier = participantIdentifierCreator(participants);

      // check if conversation already exists
      const convoExists = await Conversation.findOne({
        where: { convoIdentifier },
      });

      if (convoExists) {
        return res.status(409).json({
          success: false,
          message: "conversation found",
          results: { foundConvoId: convoExists.id },
        });
      }

      // create conversation
      const convo = await Conversation.create({ convoIdentifier });

      // format data to be inserted
      const userConversationData = participants.map((participant) => ({
        userId: participant,
        conversationId: convo.id,
      }));

      // add participants
      await User_Conversation.bulkCreate(userConversationData);

      //  retrieve conversation and return it
      const results = await Conversation.findOne({
        where: { id: convo.id },
        include: [
          { model: User, as: "participants" },
          {
            // messages array will be empty
            model: Message,
            as: "messages",
          },
        ],
      });

      // return results
      return res.status(200).json({
        success: true,
        message: "Conversation successfully created",
        results,
      });
    } catch (err) {
      console.log(err);
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
          include: [
            {
              model: Message,
              as: "messages",
              limit: 1,
              order: [["createdAt", "DESC"]],
              include: { model: User, as: "userInfo" },
            },
            {
              model: User,
              as: "participants",
              through: {
                attributes: [],
              },
            },
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });
    // return results
    return res.status(200).json({
      success: true,
      message:
        results.conversations.length > 0
          ? "Conversations found"
          : "No conversations found",
      results: results.conversations,
    });
  } catch (err) {
    console.log(err);
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
    const results = await Conversation.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Message,
          as: "messages",
          limit: 30,
          order: [["createdAt", "DESC"]],
          include: { model: User, as: "userInfo" },
        },
        {
          model: User,
          as: "participants",
          // cleanup
          through: {
            attributes: [],
          },
        },
      ],
      // cleanup
      through: {
        attributes: [],
      },
    });

    if (!results) {
      return res
        .status(400)
        .json({ success: false, message: "Not a participant" });
    }

    // reverse messages on return
    results.messages.reverse();

    // return results
    return res.status(200).json({
      success: true,
      message: results ? "Conversation found" : "Conversation not found",
      results,
    });
  } catch (err) {
    console.log(err);
    return serverErrorHandler("SERVER ERROR: could not find conversation", res);
  }
});

// @route       DELETE api/conversations/:id
// @desc        delete a conversation
// @access      Authenticated
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const convo = await Conversation.findOne({
      where: { id: req.params.id },
      include: { model: User, as: "participants" },
    });

    // check if user belongs to conversation
    const isParticipant = convo.participants.some((p) => p.id === req.user.id);

    if (!isParticipant) {
      return res.status(401).json({
        success: false,
        message: "Not a participant of this conversation",
      });
    }

    // delete conversation
    await convo.destroy();

    return res.status(200).json({
      success: true,
      message: "Conversation deleted",
    });
  } catch (err) {
    console.log(err);
    return serverErrorHandler(
      "SERVER ERROR: could not delete conversation",
      res
    );
  }
});

module.exports = router;
