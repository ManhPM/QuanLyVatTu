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
      "hoadonnhaps",
      [
        {
          maNCC: 1,
          maNV: 1,
          maKho: 1,
          ngayLapHDN: "2022-09-17",
          status: 1,
        },
        {
          maNCC: 2,
          maNV: 2,
          maKho: 1,
          ngayLapHDN: "2022-09-17",
          status: 1,
        },
        {
          maNCC: 3,
          maNV: 2,
          maKho: 1,
          ngayLapHDN: "2022-09-17",
          status: 1,
        },
        {
          maNCC: 4,
          maNV: 1,
          maKho: 1,
          ngayLapHDN: "2022-09-17",
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
     await queryInterface.bulkDelete('hoadonnhaps', null, {});
  }
};
