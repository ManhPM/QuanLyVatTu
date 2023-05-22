'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nhacungcaps', {
      maNCC: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenNCC: {
        allowNull: false,
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('Nhacungcaps');
  }
};