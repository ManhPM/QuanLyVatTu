"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "nhanviens",
      [
        {
          tenNV: "Trương Phạm Trí Cường",
          gioiTinh: "Nam",
          email: "phammanhbeo2001@gmail.com",
          ngaySinh: "2001-01-02",
          diaChi: "Long An",
          sdt: "0987606123",
          dienGiai: "nhân viên Cường",
          status: 1,
          maQuyen: 1,
        },
        {
          tenNV: "Phạm Minh Mạnh",
          gioiTinh: "Nam",
          email: "phamminhmanh15092001@gmail.com",
          ngaySinh: "2001-09-15",
          diaChi: "Đồng Nai",
          sdt: "0983312213",
          dienGiai: "quản lý Mạnh",
          status: 1,
          maQuyen: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('nhanviens', null, {});
  },
};
