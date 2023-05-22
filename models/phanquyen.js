'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phanquyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Nhanvien}) {
      // define association here
      this.hasOne(Nhanvien, { foreignKey : "maQuyen" });
    }
  }
  Phanquyen.init({
    maQuyen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenQuyen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Phanquyen',
    timestamps: false,
  });
  return Phanquyen;
};