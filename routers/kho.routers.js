const express = require("express");
const {Kho} = require("../models")
const {getAllKho, getDetailKho, createKho, updateKho, edit, create, deleteKho} = require("../controllers/kho.controllers");
const { checkExistKho } = require("../middlewares/validates/checkExist");
const { checkCreateKho } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const khoRouter = express.Router();

khoRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
khoRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllKho);
khoRouter.get("/:maKho/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
khoRouter.get("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), getDetailKho);
khoRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateKho(Kho), createKho);
khoRouter.put("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistKho(Kho), updateKho);
khoRouter.delete("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistKho(Kho), deleteKho);

module.exports = {
    khoRouter,
}