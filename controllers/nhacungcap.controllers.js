const { Nhacungcap, Hoadonnhap } = require("../models");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

const create = async (req, res, next) => { 
    res.status(200).render("nhacungcaps/createform",{
    });
}

const createNhaCungCap = async (req, res) => {
    const { tenNCC, diaChi, sdt } = req.body;
    try {
        const newNhaCungCap = await Nhacungcap.create({ tenNCC, diaChi, sdt });
        res.status(201).render("nhacungcaps/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("nhacungcaps/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getDetailNhaCungCap = async (req, res) => {
    const { maNCC } = req.params;
    try {
        const nhaCungCap = await Nhacungcap.findOne({
            where: {
                maNCC,
            },
        });
        res.status(200).send(nhaCungCap);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllNhaCungCap = async (req, res) => {
    const {tenNCC} = req.query;
    try {
        if(tenNCC){
            const nhaCungCapList = await Nhacungcap.sequelize.query(
                "SELECT * FROM nhacungcaps WHERE tenNCC LIKE :tenNCC", 
            { 
                type: QueryTypes.SELECT,    
                replacements: { tenNCC: `%${tenNCC}%` },
                raw: true
            });
            res.status(200).render("nhacungcaps/show", {
                nhacungcaps: nhaCungCapList,
            });
        }
        else {
            const nhaCungCapList = await Nhacungcap.findAll({raw: true,});
            res.status(200).render("nhacungcaps/show", {
                nhacungcaps: nhaCungCapList,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateNhaCungCap = async (req, res) => {
    const { maNCC } = req.params;
    const { tenNCC, diaChi, sdt } = req.body;
    try {
        const nhaCungCapUpdate = await Nhacungcap.findOne({
            where: {
                maNCC,
            }
        })
        nhaCungCapUpdate.tenNCC = tenNCC;
        nhaCungCapUpdate.diaChi = diaChi;
        nhaCungCapUpdate.sdt = sdt;
        await nhaCungCapUpdate.save();
        res.status(200).render("nhacungcaps/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("nhacungcaps/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const edit = async (req, res, next) => {
    const { maNCC } = req.params
    const nhaCungCap = await Nhacungcap.findOne({
        where: {
            maNCC,
        },
        raw: true
    })
    res.status(200).render("nhacungcaps/formupdate",{
        nhacungcaps: nhaCungCap
    });
}

const deleteNhaCungCap = async (req, res) => {
    const { maNCC } = req.params;
    const hoaDonNhap = await Hoadonnhap.findOne({
        where: {
            maNCC,
        }
    })
    try {
        if(hoaDonNhap){
            res.status(200).render("nhacungcaps/notification", {
                message: "Không được phép xoá nhà cung cấp có tồn tại Hoá đơn nhập"
            })
        }
        else {
            await Nhacungcap.destroy({
                where: {
                    maNCC,
                }
            });
            res.status(200).render("nhacungcaps/notification", {
                message: "Thao tác thành công",
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllNhaCungCap,
    getDetailNhaCungCap,
    createNhaCungCap,
    updateNhaCungCap,
    deleteNhaCungCap,
    edit,create
};
