const passport = require("passport");
const { User } = require("../db/models");

/*
  @DESC helper functions to validate authentication
*/

const userAuth = passport.authenticate("jwt", { session: false });

const validateEmail = async email => {
  const findEmail = await User.findOne({ where: { email } });
  return findEmail ? true : false;
};

const validateUsername = async username => {
  const findUsername = await User.findOne({ where: { username } });
  return findUsername ? true : false;
};

module.exports = {
  validateEmail,
  validateUsername,
  userAuth,
};
