const { Kho, Hoadonnhap, Hoadonxuat } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res, next) => { 
    res.status(200).render("khos/createform",{
    });
}

const createKho = async (req, res) => {
    const { tenKho } = req.body;
    try {
        const newKho = await Kho.create({ tenKho });
        res.status(201).render("khos/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("khos/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getDetailKho = async (req, res) => {
    const { maKho } = req.params;
    try {
        const kho = await Kho.findOne({
            where: {
                maKho,
            },
        });
        res.status(200).send(kho);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllKho = async (req, res) => {
    const { tenKho } = req.query;
    try {
        if(tenKho){
            const khoList = await Kho.findAll({
                where: {
                    tenKho: {
                        [Op.like]: `%${tenKho}%`,
                    },
                },
                raw: true
            });
            res.status(200).render("khos/show",{
                khos: khoList
            });
        }
        else {
            const khoList = await Kho.findAll({raw: true});
            res.status(200).render("khos/show",{
                khos: khoList
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateKho = async (req, res) => {
    const { maKho } = req.params;
    const { tenKho } = req.body;
    try {
        const khoUpdate = await Kho.findOne({
            where: {
                maKho,
            }
        })
        khoUpdate.tenKho = tenKho;
        await khoUpdate.save();
        res.status(200).render("khos/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("khos/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const deleteKho = async (req, res) => {
    const { maKho } = req.params;
    const hoaDonNhap = await Hoadonnhap.findOne({
        where: {
            maKho,
        }
    })
    const hoaDonXuat = await Hoadonxuat.findOne({
        where: {
            maKho,
        }
    })
    try {
        if(hoaDonNhap || hoaDonXuat){
            res.status(200).render("khos/notification", {
                message: "Không được phép xoá Kho có tồn tại Hoá đơn nhập hoặc xuất"
            })
        }
        else {
            await Kho.destroy({
                where: {
                    maKho,
                }
            });
            res.status(200).render("khos/notification", {
                message: "Thao tác thành công",
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const edit = async (req, res, next) => {
    const { maKho } = req.params
    const kho = await Kho.findOne({
        where: {
            maKho,
        },
        raw: true
    })
    res.status(200).render("khos/formupdate",{
        khos: kho
    });
}

module.exports = {
    getAllKho,
    getDetailKho,
    createKho,
    updateKho,
    edit,create,deleteKho
};
