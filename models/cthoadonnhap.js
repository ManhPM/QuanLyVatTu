"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CTHoadonnhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Hoadonnhap, Hanghoa}) {
      // define association here
      this.belongsTo(Hoadonnhap, { foreignKey: "maHDN" });
      this.belongsTo(Hanghoa, { foreignKey: "maHH" });
    }
  }
  CTHoadonnhap.init(
    {
      maHH:  {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      maHDN:  {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      soLuong: DataTypes.INTEGER,
      donGia: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CTHoadonnhap",
      timestamps: false,
    }
  );
  return CTHoadonnhap;
};
