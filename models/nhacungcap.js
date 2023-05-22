'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nhacungcap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hoadonnhap}) {
      this.hasOne(Hoadonnhap, { foreignKey : "maNCC" });
      // define association here
    }
  }
  Nhacungcap.init({
    maNCC: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenNCC: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    sdt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nhacungcap',
    timestamps: false,
  });
  return Nhacungcap;
};