const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {}

  Message.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize, modelName: "Message", tableName: "messages" }
  );

  return Message;
};
