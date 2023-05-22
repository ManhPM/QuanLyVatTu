'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Khos', {
      maKho: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenKho: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Khos');
  }
};