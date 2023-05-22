const express = require("express");
const {taiKhoanRouter} = require("../routers/taikhoan.routers")
const {nhanVienRouter} = require("../routers/nhanvien.routers")
const {nhaCungCapRouter} = require("../routers/nhacungcap.routers")
const {loaiHangRouter} = require("../routers/loaihang.routers")
const {khoRouter} = require("../routers/kho.routers")
const {hoaDonNhapRouter} = require("../routers/hoadonnhap.routers")
const {hoaDonXuatRouter} = require("../routers/hoadonxuat.routers")
const {hangHoaRouter} = require("../routers/hanghoa.routers")
const {ctHoaDonNhapRouter} = require("../routers/cthoadonnhap.routers")
const {ctHoaDonXuatRouter} = require("../routers/cthoadonxuat.routers")
const {khachHangRouter} = require("../routers/khachhang.routers")
const rootRouter = express.Router();

rootRouter.use("/taikhoans", taiKhoanRouter);
rootRouter.use("/nhanviens", nhanVienRouter);
rootRouter.use("/nhacungcaps", nhaCungCapRouter);
rootRouter.use("/loaihangs", loaiHangRouter);
rootRouter.use("/khos", khoRouter);
rootRouter.use("/hoadonnhaps", hoaDonNhapRouter);
rootRouter.use("/hoadonxuats", hoaDonXuatRouter);
rootRouter.use("/hanghoas", hangHoaRouter);
rootRouter.use("/cthoadonnhaps", ctHoaDonNhapRouter);
rootRouter.use("/cthoadonxuats", ctHoaDonXuatRouter);
rootRouter.use("/khachhangs", khachHangRouter);

module.exports = {
    rootRouter,
}