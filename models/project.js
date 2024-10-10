'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.hasMany(models.task, {
        foreignKey: 'projectId',
        as: 'task'
      })
    }
  }
  project.init({
    name: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};