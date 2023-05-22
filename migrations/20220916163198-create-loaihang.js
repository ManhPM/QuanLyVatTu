'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Loaihangs', {
      maLoai: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenLoai: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      moTa: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Loaihangs');
  }
};