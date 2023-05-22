const express = require("express");
const {CTHoadonnhap} = require("../models")
const { create, getDetailCTHoaDonNhap, createCTHoaDonNhap, updateCTHoaDonNhap, deleteCTHoaDonNhap, edit} = require("../controllers/cthoadonnhap.controllers");
const { checkExistCTHoaDonNhap } = require("../middlewares/validates/checkExist");
const { checkCreateCTHoaDonNhap } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const ctHoaDonNhapRouter = express.Router();

ctHoaDonNhapRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
ctHoaDonNhapRouter.get("/:maHDN/:maHH/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
ctHoaDonNhapRouter.get("/:maHDN", authenticate, authorize(["Nhân viên","Quản lý"]), getDetailCTHoaDonNhap);
ctHoaDonNhapRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateCTHoaDonNhap(CTHoadonnhap), createCTHoaDonNhap);
ctHoaDonNhapRouter.put("/:maHDN/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistCTHoaDonNhap(CTHoadonnhap), updateCTHoaDonNhap);
ctHoaDonNhapRouter.delete("/:maHDN/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistCTHoaDonNhap(CTHoadonnhap), deleteCTHoaDonNhap);

module.exports = {
    ctHoaDonNhapRouter,
}