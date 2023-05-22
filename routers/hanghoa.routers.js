const express = require("express");
const {Hanghoa} = require("../models")
const {getAllHangHoa, createHangHoa, updateHangHoa, edit, create, deleteHangHoa, getAllHangHoaChuaCoHoaDon} = require("../controllers/hanghoa.controllers");
const { checkExistHangHoa } = require("../middlewares/validates/checkExist");
const { checkCreateHangHoa } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const hangHoaRouter = express.Router();
// authenticate, authorize(["Nhân viên","Quản lý"]), 
hangHoaRouter.get("/:maHH/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
hangHoaRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllHangHoa);
hangHoaRouter.get("/show2", authenticate, authorize(["Nhân viên","Quản lý"]), getAllHangHoaChuaCoHoaDon);
hangHoaRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
hangHoaRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateHangHoa(Hanghoa), createHangHoa);
hangHoaRouter.put("/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHangHoa(Hanghoa), updateHangHoa);
hangHoaRouter.delete("/:maHH", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistHangHoa(Hanghoa), deleteHangHoa);
module.exports = {
    hangHoaRouter,
}