const { CTHoadonxuat, Hanghoa, Hoadonxuat, Taikhoan } = require("../models");
const { QueryTypes } = require("sequelize");

const create = async (req, res, next) => {
  const hangHoa = await Hanghoa.findAll({ raw: true });
  const hoaDonXuat = await Hoadonxuat.findAll({
    where: {
      status: 0,
    },
    raw: true,
  });
  res.status(200).render("cthoadonxuats/createform", {
    hanghoas: hangHoa,
    hoadonxuats: hoaDonXuat,
  });
};

const createCTHoaDonXuat = async (req, res) => {
  const { maHH, maHDX, soLuong, donGia } = req.body;
  const { username } = req;
  
  try {
    const taiKhoan = await Taikhoan.findOne({
      where: {
        username
      }
    })
    const hoaDonXuat = await Hoadonxuat.findOne({ 
      where: {
        maHDX
      },
      raw: true 
    });
    const hangHoa = await Hoadonxuat.sequelize.query(
      "SELECT DISTINCT HH.soLuongTon FROM hanghoas as HH, hoadonnhaps as HDN, cthoadonnhaps as CTHDN where CTHDN.maHH = HH.maHH AND HH.maHH = :maHH AND CTHDN.maHDN = HDN.maHDN AND HDN.maKho = :maKho",
      {
        replacements: { maHH: maHH, maKho: hoaDonXuat.maKho },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if(soLuong <= hangHoa[0].soLuongTon && hoaDonXuat.status == 0){
      if(taiKhoan.maNV != hoaDonXuat.maNV){
        res.status(200).render("cthoadonxuats/notification", {
          message: "Không được chỉnh sửa hoá đơn của nhân viên khác!",
          maHDX: maHDX
        });
      }
      else {
        const newCTHoaDonXuat = await CTHoadonxuat.create({
          maHH,
          maHDX,
          soLuong,
          donGia,
        });
        const ctHoaDonXuat = await CTHoadonxuat.findOne({
          where: {
            maHH,
            maHDX,
          },
          raw: true,
        });
        res.status(200).render("cthoadonxuats/notification", {
          message: "Thao tác thành công!",
          maHDX: maHDX
        });
      }
    }
    else if(soLuong > hangHoa[0].soLuongTon && hoaDonXuat.status == 0) {
      res.status(201).render("cthoadonxuats/notification", {
        message: "Số lượng sản phẩm trong kho không đủ!",
        maHDX: maHDX
      });
    }
    else {
      res.status(201).render("cthoadonxuats/notification", {
        message: "Hoá đơn đã thanh toán không thể cập nhật!",
        maHDX: maHDX
      });
    }
  } catch (error) {
    res.status(500).render("cthoadonxuats/notification", {
      message: "Thao tác thất bại!",
    });
  }
};


const getDetailCTHoaDonXuat = async (req, res) => {
  const { maHDX } = req.params;
  const { maHH } = req.body;
  try {
    const ctHoaDonXuat = await CTHoadonxuat.findOne({
      where: {
        maHDX,
        maHH,
      },
    });
    res.status(200).send(ctHoaDonXuat);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCTHoaDonXuat = async (req, res) => {
  const { maHDX, maHH } = req.params;
  const { soLuong, donGia } = req.body;
  try {
    const CTHoaDonXuatUpdate = await CTHoadonxuat.findOne({
      where: {
        maHDX,
        maHH,
      },
      raw: true,
    });
    const results = await CTHoadonxuat.sequelize.query(
      "UPDATE ctHoadonxuats SET soLuong = :soLuong, donGia = :donGia WHERE maHDX = :maHDXUpdate AND maHH = :maHHUpdate",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          soLuong: soLuong,
          donGia: donGia,
          maHDXUpdate: CTHoaDonXuatUpdate.maHDX,
          maHHUpdate: CTHoaDonXuatUpdate.maHH,
        },
      }
    );
    if (results) {
      res.status(200).render("cthoadonxuats/notification", {
        message: "Thao tác thành công!",
        maHDX: maHDX,
      });
    }
  } catch (error) {
    res.status(200).render("cthoadonxuats/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const deleteCTHoaDonXuat = async (req, res) => {
  const { maHDX, maHH } = req.params;
  try {
    await CTHoadonxuat.destroy({
      where: {
        maHDX,
        maHH,
      },
    });
    res.status(200).render("cthoadonxuats/notification", {
      message: "Thao tác thành công!",
      maHDX: maHDX,
    });
  } catch (error) {
    res.status(500).render("cthoadonxuats/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const edit = async (req, res, next) => {
  const { maHH, maHDX } = req.params;
  const ctHoaDonXuat = await CTHoadonxuat.findOne({
    where: {
      maHH,
      maHDX,
    },
    raw: true,
  });
  res.status(200).render("cthoadonxuats/formupdate", {
    cthoadonxuats: ctHoaDonXuat,
  });
};

module.exports = {
  getDetailCTHoaDonXuat,
  createCTHoaDonXuat,
  updateCTHoaDonXuat,
  deleteCTHoaDonXuat,
  edit,
  create,
};
