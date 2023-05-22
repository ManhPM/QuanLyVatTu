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
      "khachhangs",
      [
        {
          tenKH: "Nguyễn Đức Thịnh",
          diaChi: "KonTum",
          sdt: "0988777666",
        },
        {
          tenKH: "Trần Nhật Quân",
          diaChi: "Hải Dương",
          sdt: "0966774423",
        },
        {
          tenKH: "Lê Mậu Anh Đức",
          diaChi: "Quảng Trị",
          sdt: "0912554442",
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
     await queryInterface.bulkDelete('khachhangs', null, {});
  }
};
