'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
    }
  }
  Allcode.init({
    keyValue: DataTypes.STRING,
    type: DataTypes.STRING,
    value_vi: DataTypes.STRING,
    value_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};