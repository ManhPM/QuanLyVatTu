'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hanghoas', {
      maHH: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maLoai: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "loaihangs",
          key: "maLoai",
        },
      },
      img: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      tenHH: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      donViTinh: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      xuatXu: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      soLuongTon: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hanghoas');
  }
};