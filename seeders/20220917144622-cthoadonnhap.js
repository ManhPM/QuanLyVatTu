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
      "cthoadonnhaps",
      [
        {
          maHH: 1,
          maHDN: 1,
          soLuong: 500,
          donGia: 21000,
        },
        {
          maHH: 2,
          maHDN: 1,
          soLuong: 50,
          donGia: 200000,
        },
        {
          maHH: 3,
          maHDN: 1,
          soLuong: 500,
          donGia: 15000,
        },
        {
          maHH: 4,
          maHDN: 1,
          soLuong: 40,
          donGia: 350000,
        },
        {
          maHH: 5,
          maHDN: 2,
          soLuong: 250,
          donGia: 40000,
        },
        {
          maHH: 6,
          maHDN: 2,
          soLuong: 300,
          donGia: 150000,
        },
        {
          maHH: 7,
          maHDN: 2,
          soLuong: 350,
          donGia: 250000,
        },
        {
          maHH: 8,
          maHDN: 2,
          soLuong: 400,
          donGia: 100000,
        },
        {
          maHH: 9,
          maHDN: 3,
          soLuong: 250,
          donGia: 100000,
        },
        {
          maHH: 10,
          maHDN: 3,
          soLuong: 300,
          donGia: 100000,
        },
        {
          maHH: 11,
          maHDN: 3,
          soLuong: 200,
          donGia: 100000,
        },
        {
          maHH: 12,
          maHDN: 3,
          soLuong: 200,
          donGia: 100000,
        },
        {
          maHH: 13,
          maHDN: 3,
          soLuong: 200,
          donGia: 100000,
        },
        {
          maHH: 14,
          maHDN: 3,
          soLuong: 300,
          donGia: 100000,
        },
        {
          maHH: 15,
          maHDN: 3,
          soLuong: 500,
          donGia: 100000,
        },
        {
          maHH: 16,
          maHDN: 4,
          soLuong: 10,
          donGia: 4000000,
        },
        {
          maHH: 17,
          maHDN: 4,
          soLuong: 35,
          donGia: 300000,
        },
        {
          maHH: 18,
          maHDN: 4,
          soLuong: 15,
          donGia: 650000,
        },
        {
          maHH: 19,
          maHDN: 4,
          soLuong: 50,
          donGia: 300000,
        },
        {
          maHH: 20,
          maHDN: 4,
          soLuong: 15,
          donGia: 2000000,
        },
        {
          maHH: 21,
          maHDN: 4,
          soLuong: 25,
          donGia: 1500000,
        },
        {
          maHH: 22,
          maHDN: 4,
          soLuong: 10,
          donGia: 950000,
        },
        {
          maHH: 23,
          maHDN: 4,
          soLuong: 10,
          donGia: 900000,
        },
        {
          maHH: 24,
          maHDN: 4,
          soLuong: 10,
          donGia: 1000000,
        },
        {
          maHH: 25,
          maHDN: 4,
          soLuong: 10,
          donGia: 1000000,
        },
        {
          maHH: 26,
          maHDN: 4,
          soLuong: 10,
          donGia: 1500000,
        },
        {
          maHH: 27,
          maHDN: 4,
          soLuong: 10,
          donGia: 1200000,
        },
        {
          maHH: 28,
          maHDN: 4,
          soLuong: 10,
          donGia: 200000,
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
     await queryInterface.bulkDelete('cthoadonnhaps', null, {});
  }
};
