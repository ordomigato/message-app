const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { validateEmail, validateUsername, userAuth } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../db/models");

const serverErrorHandler = msg => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

// @route       POST api/auth/signup
// @desc        Register user
// @access      Public
router.post(
  "/signup",
  [
    check(
      "username",
      "Username must be at least 6 characters long and be alphanumeric"
    ).matches(/^[a-z][a-zA-Z0-9]{6,}$/),
    check("email", "Email is not the correct format").isEmail(),
    check("pw", "Must be at least 6 characters long").matches(
      /[A-Za-z0-9_@./#&+-]{6,}/
    ),
  ],
  async function (req, res) {
    // validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    try {
      let { username, email, pw } = req.body;

      // check is email is already in use
      let emailTaken = await validateEmail(email);
      if (emailTaken) {
        return res.status(400).json({
          msg: "Email is already taken",
          success: false,
        });
      }

      // check is username is already in use
      let usernameTaken = await validateUsername(username);
      if (usernameTaken) {
        return res.status(400).json({
          msg: "Username is already taken",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(pw, 10);

      // insert into db
      User.create({
        username,
        email,
        pw: hashedPassword,
      });

      res.status(201).json({ msg: "Account Created", success: true });
    } catch (err) {
      return serverErrorHandler("SERVER ERROR: could not create user");
    }
  }
);

// @route       POST api/auth/login
// @desc        Login user
// @access      Public
router.post(
  "/login",
  [
    check("email", "Please enter your email").not().isEmpty(),
    check("pw", "please enter your password").exists(),
  ],
  async function (req, res) {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    try {
      const { email, pw } = req.body;

      const user = await User.scope("login").findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ msg: "Incorrect credentials", success: false });
      }

      // check password
      const isMatch = await bcrypt.compare(pw, user.pw);

      if (isMatch) {
        let token = jwt.sign(
          {
            user_id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET_TOKEN
        );

        let results = {
          username: user.role,
          email: user.email,
          token: `Bearer ${token}`,
        };

        return res.status(200).json({
          results,
          message: "Login Successful",
          success: true,
        });
      } else {
        return res
          .status(401)
          .json({ msg: "Incorrect credentials", success: false });
      }
    } catch (err) {
      return serverErrorHandler("SERVER ERROR: unable to login");
    }
  }
);

// for testing userAuth middleware
router.get("/secret", userAuth, (req, res) => {
  res.status(200).send("Secret route");
});

module.exports = router;
