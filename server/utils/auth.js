const passport = require("passport");
const { User } = require("../db/models");

/*
  @DESC helper functions to validate authentication
*/

const userAuth = passport.authenticate("jwt", { session: false });

const validateEmailAvailability = async email => {
  const findEmail = await User.findOne({ where: { email } });
  return findEmail ? true : false;
};

const validateUsernameAvailability = async username => {
  const findUsername = await User.findOne({ where: { username } });
  return findUsername ? true : false;
};

module.exports = {
  validateEmailAvailability,
  validateUsernameAvailability,
  userAuth,
};
