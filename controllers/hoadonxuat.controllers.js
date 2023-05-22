const { Hoadonxuat, CTHoadonxuat, Kho, Khachhang, Nhanvien, Taikhoan } = require("../models");
const { QueryTypes } = require('sequelize');

const create = async (req, res, next) => { 
    const kho = await Kho.findAll({raw: true});
    const khachHang = await Khachhang.findAll({raw: true});
    res.status(200).render("hoadonxuats/createform",{
        khos: kho,
        khachhangs: khachHang,
    });
}

const createHoaDonXuat = async (req, res) => {
    const { maKH, maKho, status } = req.body;
    const {username} = req
        const taiKhoan = await Taikhoan.findOne({
            where: {
                username,
            },
            raw: true
        })
        const ngayLapHDX = new Date()
    try {
        const newHDX = await Hoadonxuat.create({ maKH, maNV: taiKhoan.maNV, maKho, ngayLapHDX, status });
        res.status(201).render("hoadonxuats/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("hoadonxuats/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getAllCTHoaDonXuatTheoMa = async (req, res) => {
    const { maHDX } = req.params;
        const ctHoaDonXuat = await CTHoadonxuat.sequelize.query(
            "SELECT CTHDX.*, HH.tenHH, HH.img, HDX.status FROM cthoadonxuats as CTHDX, hanghoas as HH, hoadonxuats as HDX WHERE HH.maHH = CTHDX.maHH AND CTHDX.maHDX = HDX.maHDX AND HDX.maHDX = :maHDX", 
        { 
            type: QueryTypes.SELECT,
            replacements: { maHDX: maHDX},
            raw: true
        });
        res.status(200).render("cthoadonxuats/show", {
            cthoadonxuats: ctHoaDonXuat,
            maHDX,
        });
  };

const getAllHoaDonXuat = async (req, res) => {
    const {slag} = req.query
    const {username} = req
        const taiKhoan = await Taikhoan.findOne({
            where: {
                username,
            },
            raw: true
        })
        const nhanVien = await Nhanvien.findOne({
            where: {
                maNV: taiKhoan.maNV
            }
        })
    if(slag){
        try {
            if(nhanVien.maQuyen == 1){
                const hoaDonXuatList = await Hoadonxuat.sequelize.query(
                    "SELECT HDX.*, K.tenKho, KH.tenKH, NV.tenNV FROM hoadonxuats as HDX, khos as K, nhanviens as NV, khachhangs as KH WHERE NV.maNV = HDX.maNV AND HDX.maKho = K.maKho AND HDX.maKH = KH.maKH AND HDX.ngayLapHDX LIKE :ngayLapHDX", 
                { 
                    replacements: { ngayLapHDX: `%${slag}%` },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).render("hoadonxuats/show", {
                    hoadonxuats: hoaDonXuatList
                });
            }
            else if(nhanVien.maQuyen == 2) {
                const hoaDonXuatList = await Hoadonxuat.sequelize.query(
                    "SELECT HDX.*, K.tenKho, KH.tenKH, NV.tenNV FROM hoadonxuats as HDX, khos as K, nhanviens as NV, khachhangs as KH WHERE NV.maNV = HDX.maNV AND HDX.maKho = K.maKho AND HDX.maKH = KH.maKH AND NV.maNV = :maNV AND HDX.ngayLapHDX LIKE :ngayLapHDX", 
                { 
                    type: QueryTypes.SELECT,
                    replacements: { maNV: taiKhoan.maNV, ngayLapHDX: `%${slag}%` },
                    raw: true
                });
                res.status(200).render("hoadonxuats/show", {
                    hoadonxuats: hoaDonXuatList
                });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    else {
        try {
            if(nhanVien.maQuyen == 1){
                const hoaDonXuatList = await Hoadonxuat.sequelize.query(
                    "SELECT HDX.*, K.tenKho, KH.tenKH, NV.tenNV FROM hoadonxuats as HDX, khos as K, nhanviens as NV, khachhangs as KH WHERE NV.maNV = HDX.maNV AND HDX.maKho = K.maKho AND HDX.maKH = KH.maKH", 
                { 
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).render("hoadonxuats/show", {
                    hoadonxuats: hoaDonXuatList
                });
            }
            else if(nhanVien.maQuyen == 2) {
                const hoaDonXuatList = await Hoadonxuat.sequelize.query(
                    "SELECT HDX.*, K.tenKho, KH.tenKH, NV.tenNV FROM hoadonxuats as HDX, khos as K, nhanviens as NV, khachhangs as KH WHERE NV.maNV = HDX.maNV AND HDX.maKho = K.maKho AND HDX.maKH = KH.maKH AND NV.maNV = :maNV", 
                { 
                    type: QueryTypes.SELECT,
                    replacements: { maNV: taiKhoan.maNV },
                    raw: true
                });
                res.status(200).render("hoadonxuats/show", {
                    hoadonxuats: hoaDonXuatList
                });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

const updateHoaDonXuat = async (req, res) => {
    const { maHDX } = req.params;
    const { maKH, maNV, maKho, status } = req.body;
    const {username} = req
    const taiKhoan = await Taikhoan.findOne({
        where: {
            username,
        },
        raw: true
    })
    const nhanVien = await Nhanvien.findOne({
        where: {
            maNV: taiKhoan.maNV
        }
    })
    try {
        const hoaDonXuatUpdate = await Hoadonxuat.findOne({
            where: {
                maHDX,
            }
        })
        if(nhanVien.maQuyen == 1){
            hoaDonXuatUpdate.maKH = maKH;
            hoaDonXuatUpdate.maNV = maNV;
            hoaDonXuatUpdate.maKho = maKho;
            hoaDonXuatUpdate.status = status;
            await hoaDonXuatUpdate.save();
            res.status(200).render("hoadonxuats/notification", {
                message: "Thao tác thành công!"
            });
        }
        else if(nhanVien.maQuyen != 1 && nhanVien.maNV == maNV){
            hoaDonXuatUpdate.maKH = maKH;
            hoaDonXuatUpdate.maNV = nhanVien.maNV;
            hoaDonXuatUpdate.maKho = maKho;
            hoaDonXuatUpdate.status = status;
            await hoaDonXuatUpdate.save();
            res.status(200).render("hoadonxuats/notification", {
                message: "Thao tác thành công!"
            });
        }
        else {
            res.status(200).render("hoadonxuats/notification", {
                message: "Không được phép sửa Hoá đơn của Nhân viên khác!"
            });
        }
    } catch (error) {
        res.status(500).render("hoadonxuats/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const deleteHoaDonXuat = async (req, res) => {
    const {maHDX} = req.params
    const ctHoaDonXuat = await CTHoadonxuat.findOne({
        where: {
            maHDX,
        }
    })
    try {
        if(ctHoaDonXuat){
            res.status(200).render("hoadonxuats/notification", {
                message: "Không được xoá Hoá đơn có tồn tại Chi tiết hoá đơn!",
              });
        }
        else {
            await Hoadonxuat.destroy({
                where: {
                  maHDX,
                },
              });
              res.status(200).render("hoadonxuats/notification", {
                message: "Thao tác thành công!",
              });
        }
      } catch (error) {
        res.status(500).send(error);
      }
}


const edit = async (req, res, next) => {
    const { maHDX } = req.params
    const hoaDonXuat = await Hoadonxuat.findOne({
        where: {
            maHDX,
        },
        raw: true
    })
    const kho = await Kho.findAll({raw: true});
    const khachHang = await Khachhang.findAll({raw: true});
    const nhanVien = await Nhanvien.findAll({raw: true});
    res.status(200).render("hoadonxuats/formupdate",{
        hoadonxuats: hoaDonXuat,
        khos: kho,
        khachhangs: khachHang,
        nhanviens: nhanVien,
    });
}

const inHoaDon = async (req, res, next) => {
    const { maHDX } = req.params
    const tongCong  = await Hoadonxuat.sequelize.query(
        "SELECT (SELECT SUM(CTHDX.donGia*CTHDX.soLuong) FROM hoadonxuats as HDX, cthoadonxuats as CTHDX WHERE HDX.maHDX = :maHDX AND HDX.maHDX = CTHDX.maHDX) as tongCong", 
    { 
        type: QueryTypes.SELECT,
        replacements: { maHDX: maHDX},
        raw: true
    });
    const ctHoaDonXuat  = await Hoadonxuat.sequelize.query(
        "SELECT HH.tenHH, HH.maHH, CTHDX.soLuong, CTHDX.donGia, (CTHDX.soLuong*CTHDX.donGia) as thanhTien FROM hanghoas as HH, cthoadonxuats as CTHDX WHERE HH.maHH = CTHDX.maHH AND CTHDX.maHDX = :maHDX", 
    { 
        type: QueryTypes.SELECT,
        replacements: { maHDX: maHDX},
        raw: true
    });
    const thongTinNVKH  = await Hoadonxuat.sequelize.query(
        "SELECT KH.*, HDX.*, NV.tenNV FROM khachhangs as KH, hoadonxuats as HDX, nhanviens as NV WHERE HDX.maHDX = :maHDX AND HDX.maKH = KH.maKH AND HDX.maNV = NV.maNV", 
    { 
        type: QueryTypes.SELECT,
        replacements: { maHDX: maHDX},
        raw: true
    });
    let tongcong = Number(tongCong[0].tongCong)
    tongcong = tongcong.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').toString();
    tongcong = tongcong.substring(0, tongcong.length - 3)
    res.status(200).render("invoice", {
        tongcong: tongcong,
        cthoadonxuat: ctHoaDonXuat,
        thongtin: thongTinNVKH[0],
    })
}

module.exports = {
    getAllHoaDonXuat,
    getAllCTHoaDonXuatTheoMa,
    createHoaDonXuat,
    updateHoaDonXuat,
    edit,create,deleteHoaDonXuat,
    inHoaDon
};
