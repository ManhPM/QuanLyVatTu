const express = require("express");
const {CTHoadonxuat} = require("../models")
const { create, getDetailCTHoaDonXuat, createCTHoaDonXuat, updateCTHoaDonXuat, deleteCTHoaDonXuat, edit} = require("../controllers/cthoadonxuat.controllers");
const { checkExistCTHoaDonXuat } = require("../middlewares/validates/checkExist");
const { checkCreateCTHoaDonXuat } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const ctHoaDonXuatRouter = express.Router();

ctHoaDonXuatRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
ctHoaDonXuatRouter.get("/:maHDX/:maHH/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
ctHoaDonXuatRouter.get("/:maHDX", authenticate, authorize(["Nhân viên","Quản lý"]), getDetailCTHoaDonXuat);
ctHoaDonXuatRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateCTHoaDonXuat(CTHoadonxuat), createCTHoaDonXuat);
ctHoaDonXuatRouter.put("/:maHDX/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistCTHoaDonXuat(CTHoadonxuat), updateCTHoaDonXuat);
ctHoaDonXuatRouter.delete("/:maHDX/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistCTHoaDonXuat(CTHoadonxuat), deleteCTHoaDonXuat);


module.exports = {
    ctHoaDonXuatRouter,
}