const express = require("express");
const {Khachhang} = require("../models")
const {getAllKhachHang, createKhachHang, updateKhachHang, deleteKhachHang, edit, create} = require("../controllers/khachhang.controllers");
const { checkExistKhachHang } = require("../middlewares/validates/checkExist");
const { checkCreateKhachHang } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const khachHangRouter = express.Router();

khachHangRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
khachHangRouter.get("/:maKH/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
khachHangRouter.get("/", authenticate, authorize(["Quản lý","Nhân viên"]), getAllKhachHang);
khachHangRouter.post("/create", authenticate, authorize(["Quản lý","Nhân viên"]), checkCreateKhachHang(Khachhang), createKhachHang);
khachHangRouter.put("/:maKH", authenticate, authorize(["Quản lý","Nhân viên"]), checkExistKhachHang(Khachhang), updateKhachHang);
khachHangRouter.delete("/:maKH", authenticate, authorize(["Quản lý","Nhân viên"]), checkExistKhachHang(Khachhang), deleteKhachHang);

module.exports = {
    khachHangRouter,
}