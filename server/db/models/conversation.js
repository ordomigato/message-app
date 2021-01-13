"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ User, User_Conversation, Message }) {
      this.belongsToMany(User, {
        through: User_Conversation,
        foreignKey: "conversationId",
        as: "participants",
      });
      this.hasMany(Message, { foreignKey: "conversationId" });
    }
  }
  Conversation.init(
    {},
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
