'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CTHoadonnhaps', {
      maHH: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "hanghoas",
          key: "maHH",
        },
      },
      maHDN: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "hoadonnhaps",
          key: "maHDN",
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
    await queryInterface.dropTable('CTHoadonnhaps');
  }
};