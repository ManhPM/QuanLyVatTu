'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hanghoa, Hoadonnhap, Hoadonxuat}) {
      // define association here
      this.hasOne(Hoadonnhap, { foreignKey : "maKho" });
      this.hasOne(Hoadonxuat, { foreignKey : "maKho" });
    }
  }
  Kho.init({
    maKho: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenKho: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Kho',
    timestamps: false,
  });
  return Kho;
};