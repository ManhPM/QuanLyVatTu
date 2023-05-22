'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hoadonnhaps', {
      maHDN: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maNCC: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "nhacungcaps",
          key: "maNCC",
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
      maKho: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "khos",
          key: "maKho",
        },
      },
      ngayLapHDN: {
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
    await queryInterface.dropTable('Hoadonnhaps');
  }
};