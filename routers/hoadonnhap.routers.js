const express = require("express");
const {Hoadonnhap} = require("../models")
const {getAllHoaDonNhap, thongKe, createHoaDonNhap, updateHoaDonNhap, chonNgay, edit, getAllCTHoaDonNhapTheoMa, create, deleteHoaDonNhap} = require("../controllers/hoadonnhap.controllers");
const { checkExistHoaDonNhap } = require("../middlewares/validates/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const hoaDonNhapRouter = express.Router();


hoaDonNhapRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
hoaDonNhapRouter.get("/thongke", authenticate, authorize(["Admin"]), chonNgay);
hoaDonNhapRouter.post("/thongke", authenticate, authorize(["Admin"]), thongKe);
hoaDonNhapRouter.get("/:maHDN/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
hoaDonNhapRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllHoaDonNhap);
hoaDonNhapRouter.get("/:maHDN", authenticate, authorize(["Nhân viên","Quản lý"]), getAllCTHoaDonNhapTheoMa);
hoaDonNhapRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), createHoaDonNhap);
hoaDonNhapRouter.put("/:maHDN", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHoaDonNhap(Hoadonnhap), updateHoaDonNhap);
hoaDonNhapRouter.delete("/:maHDN", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHoaDonNhap(Hoadonnhap), deleteHoaDonNhap);


module.exports = {
    hoaDonNhapRouter,
}