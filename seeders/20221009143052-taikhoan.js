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
      "taikhoans",
      [
        {
          username: "cuong",
          password: "$2a$10$mUukCNJD3SXoy9M088evTeY/xMZEbvRKLkSuEYlJVaNh15prh.GDu",
          maNV: 1,
        },
        {
          username: "manh",
          password: "$2a$10$mUukCNJD3SXoy9M088evTeY/xMZEbvRKLkSuEYlJVaNh15prh.GDu",
          maNV: 2,
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
     await queryInterface.bulkDelete('taikhoans', null, {});
  }
};
