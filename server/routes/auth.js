const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  validateEmailAvailability,
  validateUsernameAvailability,
  userAuth,
} = require("../utils/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../db/models");

const serverErrorHandler = msg => {
  res.status(500).json({
    errors: [{ msg }],
    success: false,
  });
};

// @route       POST api/auth
// @desc        check if user is authenticated
// @access      Public
router.get("/", userAuth, (req, res) => {
  res.status(200).json({ msg: "User is authenticated", success: true });
});

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
      const { username, email, pw } = req.body;

      // check is email is already in use
      const emailTaken = await validateEmailAvailability(email);
      if (emailTaken) {
        return res.status(400).json({
          msg: "Email is already taken",
          success: false,
        });
      }

      // check is username is already in use
      const usernameTaken = await validateUsernameAvailability(username);
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

      // create token
      const token = jwt.sign(
        {
          username,
          email,
        },
        process.env.JWT_SECRET_TOKEN
      );

      const results = {
        token: `Bearer ${token}`,
      };

      res.status(201).json({ results, msg: "Account Created", success: true });
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
        // create token
        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
          },
          process.env.JWT_SECRET_TOKEN
        );

        const results = {
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

module.exports = router;
