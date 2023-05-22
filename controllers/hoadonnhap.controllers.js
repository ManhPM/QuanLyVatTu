const { Hoadonnhap, Hanghoa, Hoadonxuat, CTHoadonnhap, Kho, Nhacungcap, Nhanvien, Taikhoan } = require("../models");
const { QueryTypes } = require('sequelize');
const { raw } = require("body-parser");

const create = async (req, res, next) => {
    const khoList = await Kho.findAll({raw: true});
    const nhaCungCapList = await Nhacungcap.findAll({raw: true});
    res.status(200).render("hoadonnhaps/createform",{
        khos: khoList,
        nhacungcaps: nhaCungCapList,
    });
}

const createHoaDonNhap = async (req, res) => {
    const {username} = req
        const taiKhoan = await Taikhoan.findOne({
            where: {
                username,
            },
            raw: true
        })
    const { maNCC, maKho, status } = req.body;
    const ngayLapHDN = new Date();
    try {
        const newHDN = await Hoadonnhap.create({ maNCC, maNV:taiKhoan.maNV, maKho, status, ngayLapHDN });
        res.status(201).render("hoadonnhaps/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("hoadonnhaps/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getAllHoaDonNhap = async (req, res) => {
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
            if(nhanVien.maQuyen == 1) {
                const hoaDonNhapList = await Hoadonnhap.sequelize.query(
                    "SELECT HDN.*, NCC.*, NV.maNV, NV.tenNV, K.* FROM nhacungcaps as NCC, nhanviens as NV, khos as K, hoadonnhaps as HDN WHERE HDN.maKho = K.maKho AND HDN.maNCC = NCC.maNCC AND HDN.maNV = NV.maNV AND HDN.ngayLapHDN LIKE :ngayLapHDN", 
                { 
                    replacements: { ngayLapHDN: `%${slag}%` },
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).render("hoadonnhaps/show", {
                    hoadonnhaps: hoaDonNhapList,
                });
            }
            else {
                const hoaDonNhapList = await Hoadonnhap.sequelize.query(
                    "SELECT HDN.*, NCC.*, NV.maNV, NV.tenNV, K.* FROM nhacungcaps as NCC, nhanviens as NV, khos as K, hoadonnhaps as HDN WHERE HDN.maKho = K.maKho AND HDN.maNCC = NCC.maNCC AND HDN.maNV = NV.maNV AND NV.maNV = :maNV AND HDN.ngayLapHDN = :ngayLapHDN", 
                { 
                    type: QueryTypes.SELECT,
                    replacements: { maNV: taiKhoan.maNV, ngayLapHDN: `%${slag}%` },
                    raw: true
                });
                res.status(200).render("hoadonnhaps/show", {
                    hoadonnhaps: hoaDonNhapList,
                });
            }
        }
        else {
            if(nhanVien.maQuyen == 1) {
                const hoaDonNhapList = await Hoadonnhap.sequelize.query(
                    "SELECT HDN.*, NCC.*, NV.maNV, NV.tenNV, K.* FROM nhacungcaps as NCC, nhanviens as NV, khos as K, hoadonnhaps as HDN WHERE HDN.maKho = K.maKho AND HDN.maNCC = NCC.maNCC AND HDN.maNV = NV.maNV", 
                { 
                    type: QueryTypes.SELECT,
                    raw: true
                });
                res.status(200).render("hoadonnhaps/show", {
                    hoadonnhaps: hoaDonNhapList,
                });
            }
            else {
                const hoaDonNhapList = await Hoadonnhap.sequelize.query(
                    "SELECT HDN.*, NCC.*, NV.maNV, NV.tenNV, K.* FROM nhacungcaps as NCC, nhanviens as NV, khos as K, hoadonnhaps as HDN WHERE HDN.maKho = K.maKho AND HDN.maNCC = NCC.maNCC AND HDN.maNV = NV.maNV AND NV.maNV = :maNV", 
                { 
                    type: QueryTypes.SELECT,
                    replacements: { maNV: taiKhoan.maNV },
                    raw: true
                });
                res.status(200).render("hoadonnhaps/show", {
                    hoadonnhaps: hoaDonNhapList,
                });
            }
        }
}
const getAllCTHoaDonNhapTheoMa = async (req, res) => {
    const { tenHH } = req.query
    const { maHDN } = req.params;
    if(tenHH){
        const ctHoaDonNhap = await CTHoadonnhap.sequelize.query(
            "SELECT CTHDN.*, HH.tenHH, HH.img, HDN.status FROM cthoadonnhaps as CTHDN, hanghoas as HH, hoadonnhaps as HDN WHERE HH.maHH = CTHDN.maHH AND CTHDN.maHDN = HDN.maHDN AND HDN.maHDN = :maHDN", 
        { 
            type: QueryTypes.SELECT,
            replacements: { maHDN: maHDN},
            raw: true
        });
        res.status(200).render("cthoadonnhaps/show", {
            cthoadonnhaps: ctHoaDonNhap,
            maHDN: maHDN,
        });
    }
    else{
        const ctHoaDonNhap = await CTHoadonnhap.sequelize.query(
            "SELECT CTHDN.*, HH.tenHH, HH.img, HDN.status FROM cthoadonnhaps as CTHDN, hanghoas as HH, hoadonnhaps as HDN WHERE HH.maHH = CTHDN.maHH AND CTHDN.maHDN = HDN.maHDN AND HDN.maHDN = :maHDN", 
        { 
            type: QueryTypes.SELECT,
            replacements: { maHDN: maHDN },
            raw: true
        });
        res.status(200).render("cthoadonnhaps/show", {
            cthoadonnhaps: ctHoaDonNhap,
            maHDN: maHDN,
        });
    }
  };

const updateHoaDonNhap = async (req, res) => {
    const { maHDN } = req.params;
    const { maNCC, maNV, maKho, status } = req.body;
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
        const hoaDonNhapUpdate = await Hoadonnhap.findOne({
            where: {
                maHDN,
            }
        })
        if(nhanVien.maQuyen == 1){
            hoaDonNhapUpdate.maNCC = maNCC;
            hoaDonNhapUpdate.maNV = maNV;
            hoaDonNhapUpdate.maKho = maKho;
            hoaDonNhapUpdate.status = status;
            await hoaDonNhapUpdate.save();
            res.status(200).render("hoadonnhaps/notification", {
                message: "Thao tác thành công!"
            });
        }
        else if(nhanVien.maQuyen != 1 && nhanVien.maNV == maNV){
            hoaDonNhapUpdate.maNCC = maNCC;
            hoaDonNhapUpdate.maNV = nhanVien.maNV;
            hoaDonNhapUpdate.maKho = maKho;
            hoaDonNhapUpdate.status = status;
            await hoaDonNhapUpdate.save();
            res.status(200).render("hoadonnhaps/notification", {
                message: "Thao tác thành công!"
            });
        }
        else {
            res.status(200).render("hoadonnhaps/notification", {
                message: "Không được phép sửa Hoá đơn của Nhân viên khác!"
            });
        }
    } catch (error) {
        res.status(500).render("hoadonnhaps/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const deleteHoaDonNhap = async (req, res) => {
    const {maHDN} = req.params
    const ctHoaDonNhap = await CTHoadonnhap.findOne({
        where: {
            maHDN,
        }
    })
    try {
        if(ctHoaDonNhap){
            res.status(200).render("hoadonnhaps/notification", {
                message: "Không được xoá Hoá đơn có tồn tại Chi tiết hoá đơn!",
              });
        }
        else {
            await Hoadonnhap.destroy({
                where: {
                  maHDN,
                },
              });
              res.status(200).render("hoadonnhaps/notification", {
                message: "Thao tác thành công!",
              });
        }
      } catch (error) {
        res.status(500).send(error);
      }
}

const thongKe = async (req, res) => {
    const {tuNgay, denNgay} = req.body
    const thongKe = await Hoadonnhap.sequelize.query(
        "SELECT (SELECT SUM(CTHDX.donGia * CTHDX.soLuong) as tongXuat FROM cthoadonxuats as CTHDX, hoadonxuats as HDX WHERE HDX.maHDX = CTHDX.maHDX AND HDX.ngayLapHDX BETWEEN :tuNgay AND :denNgay) as tongXuat, (SELECT SUM(CTHDN.donGia * CTHDN.soLuong) as tongNhap FROM cthoadonnhaps as CTHDN, hoadonnhaps as HDN WHERE HDN.maHDN = CTHDN.maHDN AND HDN.ngayLapHDN BETWEEN :tuNgay AND :denNgay) as tongNhap, (SELECT COUNT(*) FROM hanghoas) as soLuongHangHoa, (SELECT COUNT(*) FROM nhanviens) as soLuongNhanVien", 
    { 
        type: QueryTypes.SELECT,
        replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
        raw: true
    });
    let tongNhap = Number(thongKe[0].tongNhap)
    let tongXuat = Number(thongKe[0].tongXuat)
    tongNhap = tongNhap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').toString();
    tongXuat = tongXuat.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').toString();
    tongNhap = tongNhap.substring(0, tongNhap.length - 3)
    tongXuat = tongXuat.substring(0, tongXuat.length - 3)
    res.status(200).render("thongke", {
        tongNhap: tongNhap,
        tongXuat: tongXuat,
        soLuongHangHoa: thongKe[0].soLuongHangHoa,
        soLuongNhanVien: thongKe[0].soLuongNhanVien,
    })
}

const chonNgay = async (req, res, next) => {
    res.status(200).render("hoadonnhaps/chonNgay",{
    });
}

const edit = async (req, res, next) => {
    const khoList = await Kho.findAll({raw: true});
    const nhaCungCapList = await Nhacungcap.findAll({raw: true});
    const nhanVienList = await Nhanvien.findAll({raw: true});
    const { maHDN } = req.params
    const hoaDonNhap = await Hoadonnhap.findOne({
        where: {
            maHDN,
        },
        raw: true
    })
    res.status(200).render("hoadonnhaps/formupdate",{
        hoadonnhaps: hoaDonNhap,
        khos: khoList,
        nhacungcaps: nhaCungCapList,
        nhanviens: nhanVienList,
    });
}

module.exports = {
    getAllHoaDonNhap,
    createHoaDonNhap,
    updateHoaDonNhap,
    edit,create,deleteHoaDonNhap,
    getAllCTHoaDonNhapTheoMa,
    thongKe,chonNgay
};
