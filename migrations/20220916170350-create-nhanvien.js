'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nhanviens', {
      maNV: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maQuyen: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "phanquyens",
          key: "maQuyen",
        },
      },
      tenNV: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      gioiTinh: {
        allowNull: false,
        type: Sequelize.STRING(3),
      },
      ngaySinh: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      diaChi: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      sdt: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      dienGiai: {
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nhanviens');
  }
};