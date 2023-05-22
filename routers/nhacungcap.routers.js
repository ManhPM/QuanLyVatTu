const express = require("express");
const {Nhacungcap} = require("../models")
const {getAllNhaCungCap, edit, getDetailNhaCungCap, createNhaCungCap, updateNhaCungCap, deleteNhaCungCap, create} = require("../controllers/nhacungcap.controllers");
const { checkExistNhaCungCap } = require("../middlewares/validates/checkExist");
const { checkCreateNhaCungCap } = require("../middlewares/validates/checkCreate");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const nhaCungCapRouter = express.Router();

nhaCungCapRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
nhaCungCapRouter.get("/:maNCC/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
nhaCungCapRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllNhaCungCap);;
nhaCungCapRouter.get("/:maNCC", authenticate, authorize(["Nhân viên","Quản lý"]), getDetailNhaCungCap);
nhaCungCapRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateNhaCungCap(Nhacungcap), createNhaCungCap);
nhaCungCapRouter.put("/:maNCC", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistNhaCungCap(Nhacungcap), updateNhaCungCap);
nhaCungCapRouter.delete("/:maNCC", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistNhaCungCap(Nhacungcap), deleteNhaCungCap);

module.exports = {
    nhaCungCapRouter,
}