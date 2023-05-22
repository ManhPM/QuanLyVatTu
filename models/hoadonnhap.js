'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hoadonnhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Nhacungcap, Nhanvien, CTHoadonnhap, Kho}) {
      this.belongsTo(Nhacungcap, { foreignKey : "maNCC" });
      this.belongsTo(Nhanvien, { foreignKey : "maNV" });
      this.belongsTo(Kho, { foreignKey : "maKho" });
      this.hasOne(CTHoadonnhap, { foreignKey : "maHDN" });
      // define association here
    }
  }
  Hoadonnhap.init({
    maHDN: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ngayLapHDN: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hoadonnhap',
    timestamps: false,
  });
  return Hoadonnhap;
};