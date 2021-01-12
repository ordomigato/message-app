"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Conversation }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "createdBy",
        allowNull: false,
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
