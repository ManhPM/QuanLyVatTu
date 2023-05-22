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
      "nhacungcaps",
      [
        {
          tenNCC: "Nông Sản Sao Khuê - Công Ty TNHH Thương Mại Xuất Nhập Khẩu Sao Khuê",
          diaChi: "Số 135/17/63 Đường Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh (TPHCM)",
          sdt: "0908261003",
        },
        {
          tenNCC: "CÔNG TY CỔ PHẦN FOCOCEV VIỆT NAM",
          diaChi: "Số 21 đường Bùi Thị Xuân, Phường Bến Thành, Quận 1, Tp Hồ Chí Minh (TPHCM)",
          sdt: "0286291024",
        },
        {
          tenNCC: "Công ty TNHH Thiết Bị Thái Bình",
          diaChi: "Phòng 3C, tầng 3, 157 – 159 đường Xuân Hồng, phường 12, quận Tân Bình – Thành Phố Hồ Chí Minh",
          sdt: "0976234380",
        },
        {
          tenNCC: "Công ty Cổ phần Hà Yến",
          diaChi: "Số 3, Lô CN6, Cụm CN Vừa Và Nhỏ Từ Liêm, Phường Minh Khai, Quận Bắc Từ Liêm, Hà Nội, Việt Nam",
          sdt: "0243765699",
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
     await queryInterface.bulkDelete('nhacungcaps', null, {});
  }
};
