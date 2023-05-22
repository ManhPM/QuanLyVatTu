'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khachhang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hoadonxuat}) {
      // define association here
      this.hasOne(Hoadonxuat, { foreignKey : "maKH" });
    }
  }
  Khachhang.init({
    maKH:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenKH: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    sdt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Khachhang',
    timestamps: false,
  });
  return Khachhang;
};