const express = require("express");
const {Nhanvien} = require("../models")
const {getAllNhanVien, edit, createNhanVien, updateNhanVien, deleteNhanVien, create} = require("../controllers/nhanvien.controllers");
const { checkExistNhanVien } = require("../middlewares/validates/checkExist");
const { checkCreateNhanVien } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const nhanVienRouter = express.Router();

nhanVienRouter.get("/new", authenticate, authorize(["Quản lý","Admin"]), create);
nhanVienRouter.get("/:maNV/edit", authenticate, authorize(["Quản lý","Admin"]), edit);
nhanVienRouter.get("/", authenticate, authorize(["Quản lý","Admin"]), getAllNhanVien);
nhanVienRouter.post("/create", authenticate, authorize(["Quản lý","Admin"]), checkCreateNhanVien(Nhanvien), createNhanVien);
nhanVienRouter.put("/:maNV", authenticate, authorize(["Quản lý","Admin"]), checkExistNhanVien(Nhanvien), updateNhanVien);
nhanVienRouter.delete("/:maNV", authenticate, authorize(["Quản lý","Admin"]), checkExistNhanVien(Nhanvien), deleteNhanVien);

module.exports = {
    nhanVienRouter,
}