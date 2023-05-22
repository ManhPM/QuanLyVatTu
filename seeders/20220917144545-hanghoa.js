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
      "hanghoas",
      [
        {
          maLoai: 1,
          tenHH: "Đường",
          img: "https://cf.shopee.vn/file/da2764d613b765b8bcc1d4fa429b7aee",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Sữa tươi",
          img: "https://salt.tikicdn.com/cache/w1200/ts/product/67/a7/34/c1c424de5cceb0876daaf8009e90cc63.jpg",
          donViTinh: "thùng",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Muối",
          img: "https://cdn.tgdd.vn/Products/Images/2803/203764/bhx/muoi-i-ot-cao-cap-vifon-goi-950g-201906122059083299.jpg",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Nước mắm",
          img: "'https://minhcaumart.vn/media/com_eshop/products/8936017361303.jpg'",
          donViTinh: "thùng",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Chè",
          img: "'https://hd1.hotdeal.vn/images/uploads/2015/06/30/125966/125966-tra-body-%20%283%29.jpg'",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Hạt tiêu",
          img: "'https://kenh14cdn.com/2018/12/28/photo-2-15459692072461842347868.jpg'",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Cacao",
          img: "",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 1,
          tenHH: "Cà phê",
          donViTinh: "ký",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Đá phiến, đã hoặc chưa đẽo thô hay mới chỉ cắt, thành khối hoặc tấm hình chữ nhật, hình vuông",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Đá cẩm thạch, travectine",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Đá granit, pophia, bazan",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Đá phấn",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Sỏi, đá cuội",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Đất sét chịu lửa",
          donViTinh: "tạ",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 2,
          tenHH: "Hỗn hợp cát, đá, sỏi và chất thải công nghiệp tận thu trong quá trình khai thác dùng cho xây dựng",
          donViTinh: "mét khối",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Tivi",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Điều hoà",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Quạt điện",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Lò vi sóng",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Đèn chiếu sáng",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 3,
          tenHH: "Máy nước nóng",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Máy hút bụi",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Máy cưa lọng",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Máy khoan",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Thang nhôm",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Máy cắt cỏ",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Máy bào",
          donViTinh: "cái",
          xuatXu: "Việt nam",
        },
        {
          maLoai: 4,
          tenHH: "Bộ dụng cụ đa năng dùng trong gia đình",
          donViTinh: "bộ",
          xuatXu: "Việt nam",
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
     await queryInterface.bulkDelete('hanghoas', null, {});
  }
};
