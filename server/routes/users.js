const express = require("express");
const router = express.Router({ mergeParams: true });
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { userAuth } = require("../utils/auth");
const { User } = require("../db/models");

const serverErrorHandler = (msg, res) => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

// @route       POST api/users/username/:username
// @desc        find users by username
// @access      Authenticated
router.get("/username/:username", userAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      where: { username: { [Op.like]: "%" + req.params.username + "%" } },
    });
    return res
      .status(200)
      .json({
        message: users.length > 0 ? "Users found" : "No users found",
        success: true,
        users,
      });
  } catch (err) {
    console.log(err);
    return serverErrorHandler(
      "SERVER ERROR: could not attempt to find users",
      res
    );
  }
});

module.exports = router;
