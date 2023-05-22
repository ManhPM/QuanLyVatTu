'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loaihang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hanghoa}) {
      this.hasOne(Hanghoa, { foreignKey : "maLoai" });
      // define association here
    }
  }
  Loaihang.init({
    maLoai: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenLoai: DataTypes.STRING,
    moTa: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Loaihang',
    timestamps: false,
  });
  return Loaihang;
};