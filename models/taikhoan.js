'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taikhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Nhanvien}) {
      // define association here
      this.belongsTo(Nhanvien, { foreignKey : "maNV" , as: "taikhoan"});
    }
  }
  Taikhoan.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    active: DataTypes.INTEGER,
    forgot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Taikhoan',
    timestamps: false,
  });
  return Taikhoan;
};