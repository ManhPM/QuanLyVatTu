'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CTHoadonxuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hanghoa, Hoadonxuat}) {
      // define association here
      this.belongsTo(Hanghoa, { foreignKey : "maHH" });
      this.belongsTo(Hoadonxuat, { foreignKey : "maHDX" });
    }
  }
  CTHoadonxuat.init({
    maHH:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    maHDX:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    soLuong: DataTypes.INTEGER,
    donGia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CTHoadonxuat',
    timestamps: false,
  });
  return CTHoadonxuat;
};