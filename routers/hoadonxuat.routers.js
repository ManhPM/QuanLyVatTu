const express = require("express");
const {Hoadonxuat} = require("../models")
const {getAllHoaDonXuat, inHoaDon, createHoaDonXuat, updateHoaDonXuat, edit, getAllCTHoaDonXuatTheoMa, create, deleteHoaDonXuat} = require("../controllers/hoadonxuat.controllers");
const { checkExistHoaDonXuat } = require("../middlewares/validates/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const hoaDonXuatRouter = express.Router();

hoaDonXuatRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
hoaDonXuatRouter.get("/:maHDX/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
hoaDonXuatRouter.get("/:maHDX/invoice", authenticate, authorize(["Nhân viên","Quản lý"]), inHoaDon);
hoaDonXuatRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllHoaDonXuat);
hoaDonXuatRouter.get("/:maHDX", authenticate, authorize(["Nhân viên","Quản lý"]), getAllCTHoaDonXuatTheoMa);
hoaDonXuatRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), createHoaDonXuat);
hoaDonXuatRouter.put("/:maHDX", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHoaDonXuat(Hoadonxuat), updateHoaDonXuat);
hoaDonXuatRouter.delete("/:maHDX", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHoaDonXuat(Hoadonxuat), deleteHoaDonXuat);

module.exports = {
    hoaDonXuatRouter,
}