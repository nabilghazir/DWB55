'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projectss.init({
    projectname: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    description: DataTypes.TEXT,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    javascript: DataTypes.BOOLEAN,
    android: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projectss',
  });
  return projectss;
};