'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nhanvien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Taikhoan, Hoadonxuat, Hoadonnhap, Phanquyen}) {
      this.hasOne(Taikhoan, { foreignKey : "maNV", as: "taikhoan" });
      this.hasOne(Hoadonxuat, { foreignKey : "maNV" });
      this.hasOne(Hoadonnhap, { foreignKey : "maNV" });
      this.belongsTo(Phanquyen, { foreignKey : "maQuyen" })
      // define association here
    }
  }
  Nhanvien.init({
    maNV: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenNV: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    ngaySinh: DataTypes.DATEONLY,
    diaChi: DataTypes.STRING,
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    dienGiai: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nhanvien',  
    timestamps: false,
  });
  return Nhanvien;
};