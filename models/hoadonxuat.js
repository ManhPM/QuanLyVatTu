'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hoadonxuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Nhanvien, CTHoadonxuat, Kho}) {
      // define association here
      this.belongsTo(Nhanvien, { foreignKey : "maNV" });
      this.belongsTo(Kho, { foreignKey : "maKho" });
      this.hasOne(CTHoadonxuat, { foreignKey : "maHDX" });
    }
  }
  Hoadonxuat.init({
    maHDX: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ngayLapHDX: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hoadonxuat',
    timestamps: false,
  });
  return Hoadonxuat;
};