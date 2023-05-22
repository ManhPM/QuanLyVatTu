'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
      "hoadonxuats",
      [
        {
          maKH: 1,
          maNV: 1,
          maKho: 1,
          ngayLapHDX: "2022-09-17",
          status: 1,
        },
        {
          maKH: 2,
          maNV: 1,
          maKho: 1,
          ngayLapHDX: "2022-09-17",
          status: 1,
        },
        {
          maKH: 3,
          maNV: 2,
          maKho: 1,
          ngayLapHDX: "2022-09-17",
          status: 1,
        },
        {
          maKH: 3,
          maNV: 2,
          maKho: 1,
          ngayLapHDX: "2022-09-18",
          status: 1,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('hoadonxuats', null, {});
  }
};
