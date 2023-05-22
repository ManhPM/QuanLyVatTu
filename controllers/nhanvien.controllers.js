const { Nhanvien, Phanquyen, Taikhoan, Hoadonnhap, Hoadonxuat } = require("../models");
const { QueryTypes } = require('sequelize');
const getAllNhanVien = async (req, res) => {
    const {tenNV} = req.query;
    try {
        if(tenNV){
            const nhanVienList = await Nhanvien.sequelize.query(
                "SELECT NV.*, PQ.tenQuyen FROM nhanviens as NV, phanquyens as PQ WHERE PQ.maQuyen = NV.maQuyen AND NV.tenNV LIKE :tenNV", 
            { 
                replacements: { tenNV: `%${tenNV}%` },
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).render("nhanviens/show", {
                nhanviens: nhanVienList
            })
        }
        else {
            const nhanVienList = await Nhanvien.sequelize.query(
                "SELECT NV.*, PQ.tenQuyen FROM nhanviens as NV, phanquyens as PQ WHERE PQ.maQuyen = NV.maQuyen", 
            { 
                type: QueryTypes.SELECT,
                raw: true
            });
            res.status(200).render("nhanviens/show", {
                nhanviens: nhanVienList
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const create = async (req, res, next) => {
    const {username} = req;
    const quyen = await Phanquyen.sequelize.query(
        "SELECT PQ.* FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND TK.username = :username", 
    { 
        replacements: { username: `${username}` },
        type: QueryTypes.SELECT,
        raw: true
    });
    if(quyen[0].maQuyen != 3){
        res.status(200).render("nhanviens/createform",{
            flag: 1,
        });
    }else {
        const phanQuyenList = await Phanquyen.findAll({raw: true})
        res.status(200).render("nhanviens/createform",{
            phanquyens: phanQuyenList,
            flag: 0,
        });
    }
}

const createNhanVien = async (req, res) => {
    const {username} = req;
    const quyen = await Phanquyen.sequelize.query(
        "SELECT PQ.* FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND TK.username = :username", 
    { 
        replacements: { username: `${username}` },
        type: QueryTypes.SELECT,
        raw: true
    });
    let { tenNV, ngaySinh, email, gioiTinh, diaChi, sdt, dienGiai, maQuyen } = req.body;
    try {
        if(quyen[0].maQuyen != 3){
            maQuyen = 2;
        }
        const newNhanVien = await Nhanvien.create({ tenNV, ngaySinh, email, gioiTinh, diaChi, sdt, dienGiai, maQuyen });
        res.status(201).render("nhanviens/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("nhanviens/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const updateNhanVien = async (req, res) => {
    const { maNV } = req.params;
    const { username } = req;
    const taiKhoan = await Taikhoan.findOne({
        where: {
            username
        },
    })
    const { tenNV, ngaySinh, email, gioiTinh, diaChi, sdt, dienGiai, maQuyen, status } = req.body;
    try {
        const nhanVienUpdate = await Nhanvien.findOne({
            where: {
                maNV,
            }
        })
        if(taiKhoan.maNV == maNV){
            const phanQuyen = await Taikhoan.sequelize.query(
                "SELECT NV.maQuyen FROM nhanviens as NV, taikhoans as TK WHERE TK.maNV = NV.maNV AND TK.username = :username",
                {
                  type: QueryTypes.SELECT,
                  replacements: {
                    username: username,
                  },
                }
              );
              console.log(phanQuyen[0].maQuyen, status)
            if(phanQuyen[0].maQuyen != 3 && status != nhanVienUpdate.status){
                res.status(200).render("nhanviens/notification", {
                    message: "Không được cập nhật trạng thái của bản thân!"
                });
            }
            else if(phanQuyen[0].maQuyen != 3 && nhanVienUpdate.maQuyen == 3){
                res.status(200).render("nhanviens/notification", {
                    message: "Bạn không có quyền thay đổi thông tin Admin!"
                });
            }
            else {
                nhanVienUpdate.tenNV = tenNV;
                nhanVienUpdate.ngaySinh = ngaySinh;
                nhanVienUpdate.email = email;
                nhanVienUpdate.diaChi = diaChi;
                nhanVienUpdate.gioiTinh = gioiTinh;
                nhanVienUpdate.sdt = sdt;
                nhanVienUpdate.dienGiai = dienGiai;
                nhanVienUpdate.maQuyen = maQuyen;
                nhanVienUpdate.status = status;
                await nhanVienUpdate.save();
                res.status(200).render("nhanviens/notification", {
                    message: "Thao tác thành công!"
                });
            }
        }
        else {
            nhanVienUpdate.tenNV = tenNV;
            nhanVienUpdate.ngaySinh = ngaySinh;
            nhanVienUpdate.email = email;
            nhanVienUpdate.diaChi = diaChi;
            nhanVienUpdate.gioiTinh = gioiTinh;
            nhanVienUpdate.sdt = sdt;
            nhanVienUpdate.dienGiai = dienGiai;
            nhanVienUpdate.maQuyen = maQuyen;
            nhanVienUpdate.status = status;
            await nhanVienUpdate.save();
            res.status(200).render("nhanviens/notification", {
                message: "Thao tác thành công!"
            });
        }
    } catch (error) {
        res.status(500).render("nhanviens/notification", {
            message: "Thao tác thất bại!"
        });
    }
}


const edit = async (req, res, next) => {
    const { maNV } = req.params
    const phanQuyenList = await Phanquyen.sequelize.query(
        "SELECT * FROM phanquyens WHERE maQuyen != 3",
        {
          type: QueryTypes.SELECT,
          raw: true
        }
      );
    const nhanVien = await Nhanvien.findOne({
        where: {
            maNV,
        },
        raw: true
    })
    res.status(200).render("nhanviens/formupdate",{
        nhanviens: nhanVien,
        phanquyens: phanQuyenList
    });
}


const deleteNhanVien = async (req, res) => {
    const {username} = req;
    const phanQuyen = await Taikhoan.sequelize.query(
        "SELECT NV.maQuyen FROM nhanviens as NV, taikhoans as TK WHERE TK.maNV = NV.maNV AND TK.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );
    if(phanQuyen[0].maQuyen != 3){
        res.status(200).render("nhanviens/notification", {
            message: "Bạn không có quyền sử dụng chức năng này"
        })
    }
    else{
        const { maNV } = req.params;
        const hoaDonNhap = await Hoadonnhap.findOne({
        where: {
            maNV,
        }
    })
    const hoaDonXuat = await Hoadonxuat.findOne({
        where: {
            maNV,
        }
    })
    const taiKhoan = await Taikhoan.findOne({
        where: {
            maNV
        }
    })
    try {
        if(hoaDonNhap || hoaDonXuat){
            res.status(200).render("nhanviens/notification", {
                message: "Không được phép xoá Nhân viên có tồn tại Hoá đơn nhập hoặc xuất"
            })
        }
        else if(taiKhoan){
            res.status(200).render("nhanviens/notification", {
                message: "Không được phép xoá Nhân viên có tồn tại Tài khoản"
            })
        }
        else {
            await Nhanvien.destroy({
                where: {
                    maNV,
                }
            });
            res.status(200).render("nhanviens/notification", {
                message: "Thao tác thành công",
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
    }
}

module.exports = {
    getAllNhanVien,
    createNhanVien,
    updateNhanVien,
    deleteNhanVien,
    edit,create
};
