const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Model {
    async comparePassword(plain) {
      return bcrypt.compare(plain, this.passwordHash);
    }

    toSafeJSON() {
      const { id, username, email, role, createdAt } = this;
      return { id, username, email, role, createdAt };
    }
  }

  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    { sequelize, modelName: "User", tableName: "users" }
  );

  return User;
};
