'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Taikhoans', {
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      forgot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      maNV: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "nhanviens",
          key: "maNV",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Taikhoans');
  }
};