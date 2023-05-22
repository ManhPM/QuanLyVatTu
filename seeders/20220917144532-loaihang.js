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
      "loaihangs",
      [
        {
          tenLoai: "Tiêu hao",
          moTa: "test 1"
        },
        {
          tenLoai: "Nguyên liệu, vật liệu",
          moTa: "test 2"
        },
        {
          tenLoai: "Thiết bị, máy móc",
          moTa: "test 3"
        },
        {
          tenLoai: "Công cụ, dụng cụ",
          moTa: "test 4"
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
     await queryInterface.bulkDelete('loaihangs', null, {});
  }
};
