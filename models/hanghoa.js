'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hanghoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({CTHoadonxuat, CTHoadonnhap, Loaihang, Kho}) {
      this.hasOne(CTHoadonxuat, { foreignKey : "maHH" });
      this.hasOne(CTHoadonnhap, { foreignKey : "maHH" });
      this.belongsTo(Loaihang, { foreignKey : "maLoai" });
      // define association here
    }
  }
  Hanghoa.init({
    maHH: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    img: DataTypes.STRING,
    tenHH: DataTypes.STRING,
    donViTinh: DataTypes.STRING,
    xuatXu: DataTypes.STRING,
    soLuongTon: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Hanghoa',
    timestamps: false,
  });
  return Hanghoa;
};