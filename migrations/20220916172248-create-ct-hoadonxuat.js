'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTHoadonxuats', {
      maHH: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "hanghoas",
          key: "maHH",
        },
      },
      maHDX: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "hoadonxuats",
          key: "maHDX",
        },
      },
      soLuong: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      donGia: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CTHoadonxuats');
  }
};