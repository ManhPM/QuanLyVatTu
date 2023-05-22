const {
  CTHoadonnhap,
  Hanghoa,
  Hoadonnhap,
  Taikhoan,
  Nhanvien,
} = require("../models");
const { QueryTypes } = require("sequelize");

const create = async (req, res, next) => {
  const { username } = req;
  const taiKhoan = await Taikhoan.findOne({
    where: {
      username,
    },
    raw: true,
  });
  const nhanVien = await Nhanvien.findOne({
    where: {
      maNV: taiKhoan.maNV,
    },
  });
  if (nhanVien.maQuyen == 1) {
    const hangHoa = await Hanghoa.findAll({ raw: true });
    const hoaDonNhap = await Hoadonnhap.findAll({
      where: {
        status: 0,
      },
      raw: true,
    });
    res.status(200).render("cthoadonnhaps/createform", {
      hanghoas: hangHoa,
      hoadonnhaps: hoaDonNhap,
    });
  } else if (nhanVien.maQuyen != 1) {
    const hangHoa = await Hanghoa.findAll({ raw: true });
    const hoaDonNhap = await Hoadonnhap.findAll({
      where: {
        maNV: taiKhoan.maNV,
      },
      raw: true,
    });
    res.status(200).render("cthoadonnhaps/createform", {
      hanghoas: hangHoa,
      hoadonnhaps: hoaDonNhap,
    });
  }
};

const createCTHoaDonNhap = async (req, res) => {
  const { maHH, maHDN, soLuong, donGia } = req.body;
  try {
    const newCTHoaDonNhap = await CTHoadonnhap.create({
      maHH,
      maHDN,
      soLuong,
      donGia,
    });
    res.status(201).render("cthoadonnhaps/notification", {
      message: "Thao tác thành công!",
      maHDN: maHDN,
    });
  } catch (error) {
    res.status(500).render("cthoadonnhaps/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const getDetailCTHoaDonNhap = async (req, res) => {
  const { maHDN } = req.params;
  const { maHH } = req.body;
  try {
    const ctHoaDonNhap = await CTHoadonnhap.findOne({
      where: {
        maHDN,
        maHH,
      },
    });
    res.status(200).send(ctHoaDonNhap);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCTHoaDonNhap = async (req, res) => {
  const { maHDN, maHH } = req.params;
  const { soLuong, donGia } = req.body;
  try {
    const ctHoaDonNhapUpdate = await CTHoadonnhap.findOne({
      where: {
        maHDN,
        maHH,
      },
      raw: true,
    });
    const results = await CTHoadonnhap.sequelize.query(
      "UPDATE cthoadonnhaps SET soLuong = :soLuong, donGia = :donGia WHERE maHDN = :maHDNUpdate AND maHH = :maHHUpdate",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          soLuong: soLuong,
          donGia: donGia,
          maHDNUpdate: ctHoaDonNhapUpdate.maHDN,
          maHHUpdate: ctHoaDonNhapUpdate.maHH,
        },
      }
    );
    if (results) {
      res.status(200).render("cthoadonnhaps/notification", {
        message: "Thao tác thành công!",
        maHDN: maHDN,
      });
    }
  } catch (error) {
    res.status(500).render("cthoadonnhaps/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const deleteCTHoaDonNhap = async (req, res) => {
  const { maHDN, maHH } = req.params;
  try {
    await CTHoadonnhap.destroy({
      where: {
        maHDN,
        maHH,
      },
    });
    res.status(200).render("cthoadonnhaps/notification", {
      message: "Thao tác thành công!",
      maHDN: maHDN,
    });
  } catch (error) {
    res.status(500).render("cthoadonnhaps/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const edit = async (req, res, next) => {
  const { maHH, maHDN } = req.params;
  const ctHoaDonNhap = await CTHoadonnhap.findOne({
    where: {
      maHH,
      maHDN,
    },
    raw: true,
  });
  res.status(200).render("cthoadonnhaps/formupdate", {
    cthoadonnhaps: ctHoaDonNhap,
  });
};

module.exports = {
  getDetailCTHoaDonNhap,
  createCTHoaDonNhap,
  updateCTHoaDonNhap,
  deleteCTHoaDonNhap,
  edit,
  create,
};
