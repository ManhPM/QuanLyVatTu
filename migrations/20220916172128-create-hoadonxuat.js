'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hoadonxuats', {
      maHDX: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maKH: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "khachhangs",
          key: "maKH",
        },
      },
      maKho: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "khos",
          key: "maKho",
        },
      },
      maNV: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "nhanviens",
          key: "maNV",
        },
      },
      ngayLapHDX: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hoadonxuats');
  }
};