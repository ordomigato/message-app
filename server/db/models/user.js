"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Conversation, User_Conversation, Message }) {
      // define association here
      this.belongsToMany(Conversation, {
        through: User_Conversation,
        foreignKey: "userId",
        as: "conversations",
      });
      this.hasMany(Message, { foreignKey: "createdBy" });
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      pw: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      // hide password from returned object
      defaultScope: {
        attributes: { exclude: ["pw"] },
      },
      scopes: {
        login: {
          attributes: { include: ["pw"] },
        },
      },
    }
  );
  return User;
};
