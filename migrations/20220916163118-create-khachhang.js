'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Khachhangs', {
      maKH: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenKH: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      diaChi: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      sdt: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Khachhangs');
  }
};