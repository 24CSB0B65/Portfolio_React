const { sequelize } = require("../config/database");

const User = require("./User")(sequelize);
const Project = require("./Project")(sequelize);
const Message = require("./Message")(sequelize);

module.exports = { sequelize, User, Project, Message };
