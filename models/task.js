'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });

      task.belongsTo(models.project, {
        foreignKey: 'projectId',
        as: 'project'
      })
    }
  }
  task.init({
    name: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};