const express = require("express");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const { userAuth } = require("../utils/auth");
const { Message, User_Conversation } = require("../db/models");

const serverErrorHandler = (msg, res) => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

// @route       POST api/conversations/:id/messages
// @desc        post a message to a conversation
// @access      Authenticated
router.post(
  "/",
  [userAuth, [check("message", "message cannot be empty").notEmpty()]],
  async (req, res) => {
    // validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    try {
      // check if user is a part of the conversation
      const convo = await User_Conversation.findOne({
        where: { userId: req.user.id, conversationId: req.params.id },
      });

      if (!convo) {
        return res.status(401).json({
          success: false,
          message: "No Conversation Found",
        });
      }

      // create message
      const results = await Message.create({
        message: req.body.message,
        conversationId: req.params.id,
        createdBy: req.user.id,
      });
      // return results
      return res.status(200).json({
        success: true,
        message: "Message was created",
        results,
      });
    } catch (err) {
      return serverErrorHandler("SERVER ERROR: could not create message", res);
    }
  }
);

// @route       DELETE api/conversations/:id/messages/:messageId
// @desc        delete a message
// @access      Authenticated
router.delete("/:messageId", userAuth, async (req, res) => {
  console.log(req.params);
  try {
    // check if message exists
    const message = await Message.findOne({
      where: {
        id: req.params.messageId,
      },
    });

    if (!message) {
      return res.status(401).json({
        success: false,
        message: "No message Found",
      });
    }

    // check if user is owner of comment
    if (message.createdBy !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not the owner of this comment",
      });
    }

    // delete message
    await message.destroy();
    // return results
    return res.status(200).json({
      success: true,
      message: "Message was deleted",
      deleted: message, // return message for undo functionality
    });
  } catch (err) {
    return serverErrorHandler("SERVER ERROR: could not delete message", res);
  }
});

module.exports = router;
