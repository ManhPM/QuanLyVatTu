const { Khachhang, Hoadonxuat} = require("../models");
const { QueryTypes } = require('sequelize');

const create = async (req, res, next) => { 
    res.status(200).render("khachhangs/createform",{
    });
}


const createKhachHang = async (req, res) => {
    const { tenKH, diaChi, sdt} = req.body;
    try {
        const newKhachHang = await Khachhang.create({ tenKH, diaChi, sdt});
        res.status(201).render("khachhangs/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("khachhangs/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getAllKhachHang = async (req, res) => {
    const { tenKH } = req.params;
    try {
        if(tenKH){
            const khachHangList = await Khachhang.sequelize.query(
                "SELECT * FROM khachhangs where tenKH Like :tenHH", 
            { 
                type: QueryTypes.SELECT,
                replacements: { tenKH: `%${tenKH}%`},
                raw: true
            });
            res.status(200).render("khachhangs/show", {
                khachhangs: khachHangList,
            });
        }
        else {
            const khachHangList = await Khachhang.findAll({raw: true});
            res.status(200).render("khachhangs/show", {
                khachhangs: khachHangList,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateKhachHang = async (req, res) => {
    const { maKH } = req.params;
    const { tenKH, sdt, diaChi} = req.body;
    try {
        const khachHangList = await Khachhang.findOne({
            where: {
                maKH,
            }
        })
        khachHangList.tenKH = tenKH;
        khachHangList.sdt = sdt;
        khachHangList.diaChi = diaChi;
        await khachHangList.save();
        res.status(200).render("khachhangs/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("khachhangs/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const deleteKhachHang = async (req, res) => {
    const { maKH } = req.params;
    const hoaDonXuat = await Hoadonxuat.findOne({
        where: {
            maKH,
        }
    })
    console.log(hoaDonXuat)
    if(hoaDonXuat){
        res.status(200).render("khachhangs/notification", {
            message: "Không được xoá khách hàng có tồn tại hoá đơn xuất"
        })
    }
    else {
        try {
            await Khachhang.destroy({
                where: {
                    maKH,
                }
            });
            res.status(200).render("khachhangs/notification", {
                message: "Thao tác thành công!"
            });
        } catch (error) {
            res.status(300).render("khachhangs/notification", {
                message: "Thao tác thất bại!"
            });
        }
    }
}

const edit = async (req, res, next) => {
    const { maKH } = req.params
    const khachHang = await Khachhang.findOne({
        where: {
            maKH,
        },
        raw: true
    })
    res.status(200).render("khachhangs/formupdate",{
        khachhangs: khachHang
    });
}

module.exports = {
    getAllKhachHang,
    createKhachHang,
    updateKhachHang,
    deleteKhachHang,
    edit,create
};
