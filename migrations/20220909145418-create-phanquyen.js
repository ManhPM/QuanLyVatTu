'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Phanquyens', {
      maQuyen: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      tenQuyen: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Phanquyens');
  }
};