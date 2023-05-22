const express = require("express");
const {Taikhoan} = require("../models")
const {getAllTaiKhoan, information, vertify, accessForgotPassword, formlogin ,forgotPassword, logout, edit, createTaiKhoan, login, create, updateTaiKhoan, deleteTaiKhoan, getforgot} = require("../controllers/taikhoan.controllers");
const { checkExistTaiKhoan, checkLogin } = require("../middlewares/validates/checkExist");
const { checkCreateTaiKhoan } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const taiKhoanRouter = express.Router();
taiKhoanRouter.get("/logout", authenticate, authorize(["Nhân viên","Quản lý","Admin"]), logout);
taiKhoanRouter.get("/", authenticate, authorize(["Quản lý","Admin"]), getAllTaiKhoan);
taiKhoanRouter.get("/infor", authenticate, authorize(["Quản lý","Admin","Nhân viên"]), information);
taiKhoanRouter.get("/edit", authenticate, authorize(["Nhân viên","Quản lý","Admin"]), edit);
taiKhoanRouter.get("/new", authenticate, authorize(["Quản lý","Admin"]), create);
taiKhoanRouter.post("/create", authenticate, authorize(["Quản lý","Admin"]), checkCreateTaiKhoan(Taikhoan), createTaiKhoan);
taiKhoanRouter.post("/login", checkLogin(Taikhoan), login);
taiKhoanRouter.post("/vertify", vertify);
taiKhoanRouter.put("/vertify/:username", accessForgotPassword);
taiKhoanRouter.get("/login", formlogin);
taiKhoanRouter.get("/forgotpassword", getforgot);
taiKhoanRouter.post("/forgotpassword", forgotPassword);
taiKhoanRouter.put("/", authenticate, authorize(["Nhân viên","Quản lý","Admin"]), checkExistTaiKhoan(Taikhoan), updateTaiKhoan);
taiKhoanRouter.delete("/:username", authenticate, authorize(["Admin"]), checkExistTaiKhoan(Taikhoan), deleteTaiKhoan);
module.exports = {
    taiKhoanRouter,
}