const checkExistTaiKhoan = (Model) => {
  return async (req, res, next) => {
    const { username } = req;
    const taiKhoan = await Model.findOne({
      where: {
        username,
      },
    });
    if (taiKhoan) {
      next();
    } else {
      res
        .status(404)
        .send(`Không tim thấy người dùng có username là ${username}`);

    }
  };
};

const checkLogin = (Model) => {
  return async (req, res, next) => {
    const { username } = req.body;
    const taiKhoan = await Model.findOne({
      where: {
        username,
      },
    });
    if (taiKhoan) {
      next();
    } else {
      res
        .status(404)
        .send(`Không tim thấy người dùng có username là ${username}`);
        
    }
  };
};

const checkExistNhanVien = (Model) => {
  return async (req, res, next) => {
    const { maNV } = req.params;
    const nhanVien = await Model.findOne({
      where: {
        maNV,
      },
    });
    if (nhanVien) {
      next();
    } else {
      res.status(404).send(`Không tìm thấy nhân viên có id là ${maNV}`);
    }
  };
};

const checkExistNhaCungCap = (Model) => {
  return async (req, res, next) => {
    const { maNCC } = req.params;
    const nhaCungCap = await Model.findOne({
      where: {
        maNCC,
      },
    });
    if (nhaCungCap) {
      next();
    } else {
      res.status(404).send(`Không tim thấy nhà cung cấp có id là ${nhaCungCap}`);
    }
  };
};

const checkExistLoaiHang = (Model) => {
    return async (req, res, next) => {
      const { maLoai } = req.params;
      const loaiHang = await Model.findOne({
        where: {
            maLoai,
        },
      });
      if (loaiHang) {
        next();
      } else {
        res.status(404).send(`Không tim thấy loại hàng có id là ${maLoai}`);
      }
    };
  };

  const checkExistPhanQuyen = (Model) => {
    return async (req, res, next) => {
      const { maQuyen } = req.params;
      const phanQuyen = await Model.findOne({
        where: {
          maQuyen,
        },
      });
      if (phanQuyen) {
        next();
      } else {
        res.status(404).send(`Không tim thấy phân quyền có id là ${maQuyen}`);
      }
    };
  };
  
  const checkExistKho = (Model) => {
    return async (req, res, next) => {
      const { maKho } = req.params;
      const Kho = await Model.findOne({
        where: {
          maKho,
        },
      });
      if (Kho) {
        next();
      } else {
        res.status(404).send(`Không tim thấy phân quyền có id là ${maKho}`);
      }
    };
  };

  const checkExistHoaDonNhap = (Model) => {
    return async (req, res, next) => {
      const { maHDN } = req.params;
      const hoaDonNhap = await Model.findOne({
        where: {
          maHDN,
        },
      });
      if (hoaDonNhap) {
        next();
      } else {
        res.status(404).send(`Không tim thấy hoá đơn nhập có id là ${maHDN}`);
      }
    };
  };

  const checkExistHoaDonXuat = (Model) => {
    return async (req, res, next) => {
      const { maHDX } = req.params;
      const hoaDonXuat = await Model.findOne({
        where: {
          maHDX,
        },
      });
      if (hoaDonXuat) {
        next();
      } else {
        res.status(404).send(`Không tim thấy hoá đơn nhập có id là ${maHDX}`);
      }
    };
  };

  const checkExistHangHoa = (Model) => {
    return async (req, res, next) => {
      const { maHH } = req.params;
      const hangHoa = await Model.findOne({
        where: {
          maHH,
        },
      });
      if (hangHoa) {
        next();
      } else {
        res.status(404).send(`Không tim thấy hàng hoá có id là ${maHH}`);
      }
    };
  };

  const checkExistCTHoaDonNhap = (Model) => {
    return async (req, res, next) => {
      const { maHDN, maHH } = req.params;
      const ctHoaDonNhap = await Model.findOne({
        where: {
          maHDN,
          maHH
        },
      });
      if (ctHoaDonNhap) {
        next();
      } else {
        res.status(404).send(`Không tim thấy CTHoaDonNhap có idHH là ${maHH} và idHDN là ${maHDN}` );
      }
    };
  };

  const checkExistCTHoaDonXuat = (Model) => {
    return async (req, res, next) => {
      const { maHDX, maHH } = req.params;
      const ctHoaDonXuat = await Model.findOne({
        where: {
          maHDX,
          maHH
        },
      });
      if (ctHoaDonXuat) {
        next();
      } else {
        res.status(404).send(`Không tim thấy CTHoaDonXuat có idHH là ${maHH} và idHDN là ${maHDX}` );
      }
    };
  };
  const checkExistKhachHang = (Model) => {
    return async (req, res, next) => {
      const { maKH } = req.params;
      const khachHang = await Model.findOne({
        where: {
          maKH,
        },
      });
      if (khachHang) {
        next();
      } else {
        res.status(404).send(`Không tim thấy Khách hàng có id là ${maHH}`);
      }
    };
  };

module.exports = {
  checkExistTaiKhoan,
  checkExistNhanVien,
  checkExistNhaCungCap,
  checkExistLoaiHang,
  checkExistPhanQuyen,
  checkExistKho,
  checkExistHoaDonNhap,
  checkExistHoaDonXuat,
  checkExistHangHoa,
  checkExistCTHoaDonNhap,
  checkExistCTHoaDonXuat,
  checkLogin,
  checkExistKhachHang
};
