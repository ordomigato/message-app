"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Conversation }) {
      this.belongsTo(User, {
        foreignKey: "createdBy",
        allowNull: false,
        as: "userInfo",
      });
      this.belongsTo(Conversation, {
        foreignKey: "conversationId",
        allowNull: false,
      });
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      conversationId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
