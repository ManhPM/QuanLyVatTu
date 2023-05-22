const express = require("express");
const {Loaihang} = require("../models")
const {getAllLoaiHang, createLoaiHang, updateLoaiHang, deleteLoaiHang, edit, create} = require("../controllers/loaihang.controllers");
const { checkExistLoaiHang } = require("../middlewares/validates/checkExist");
const { checkCreateLoaiHang } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const loaiHangRouter = express.Router();

loaiHangRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
loaiHangRouter.get("/:maLoai/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
loaiHangRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllLoaiHang);
loaiHangRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateLoaiHang(Loaihang), createLoaiHang);
loaiHangRouter.put("/:maLoai", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistLoaiHang(Loaihang), updateLoaiHang);
loaiHangRouter.delete("/:maLoai", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistLoaiHang(Loaihang), deleteLoaiHang);

module.exports = {
    loaiHangRouter,
}