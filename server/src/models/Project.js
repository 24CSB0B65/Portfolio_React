const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Project extends Model {
    toSafeJSON() {
      const plain = this.get({ plain: true });
      return { ...plain, tech: JSON.parse(plain.tech || "[]") };
    }
  }

  Project.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      // stored as a JSON string; exposed as a real array via toSafeJSON()
      tech: { type: DataTypes.TEXT, allowNull: false, defaultValue: "[]" },
      link: { type: DataTypes.STRING, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, modelName: "Project", tableName: "projects" }
  );

  return Project;
};
