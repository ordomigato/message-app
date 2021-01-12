"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, User_Conversation, Message }) {
      // define association here
      // this.belongsTo(User, {
      //   foreignKey: "createdBy",
      //   onDelete: "cascade",
      //   allowNull: false,
      // });
      this.belongsToMany(User, {
        through: User_Conversation,
        foreignKey: "conversationId",
        as: "participants",
      });
      this.hasMany(Message, { foreignKey: "conversationId" });
    }
  }
  Conversation.init(
    {
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
