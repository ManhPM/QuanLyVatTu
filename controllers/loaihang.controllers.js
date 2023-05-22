const { Loaihang, Hanghoa } = require("../models");
const { Op } = require("sequelize");

const create = async (req, res, next) => { 
    res.status(200).render("loaihangs/createform",{
    });
}

const createLoaiHang = async (req, res) => {
    const { tenLoai, moTa } = req.body;
    try {
        const newLoaiHang = await Loaihang.create({ tenLoai, moTa });
        res.status(201).render("loaihangs/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(201).render("loaihangs/notification", {
            message: "Thao tác thất bại!"
        });
    }
}


const getAllLoaiHang = async (req, res) => {
    const { tenLoai } = req.query;
    try {
        if(tenLoai){
            const loaiHangList = await Loaihang.findAll({
                where: {
                    tenLoai: {
                        [Op.like]: `%${tenLoai}%`,
                    },
                },
                raw: true
            });
            res.status(200).render("loaihangs/show", {
                loaihangs: loaiHangList
            })
        }
        else {
            const loaiHangList = await Loaihang.findAll({raw: true});
            res.status(200).render("loaihangs/show", {
                loaihangs: loaiHangList
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateLoaiHang = async (req, res) => {
    const { maLoai } = req.params;
    const { tenLoai, moTa } = req.body;
    try {
        const loaiHangUpdate = await Loaihang.findOne({
            where: {
                maLoai,
            }
        })
        loaiHangUpdate.tenLoai = tenLoai;
        loaiHangUpdate.moTa = moTa;
        await loaiHangUpdate.save();
        res.status(200).render("loaihangs/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("loaihangs/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const edit = async (req, res, next) => {
    const { maLoai } = req.params
    const loaiHang = await Loaihang.findOne({
        where: {
            maLoai,
        },
        raw: true
    })
    res.status(200).render("loaihangs/formupdate",{
        loaihangs: loaiHang
    });
}

const deleteLoaiHang = async (req, res) => {
    const { maLoai } = req.params;
    const hangHoa = await Hanghoa.findOne({
        where: {
            maLoai,
        }
    })
    try {
        if(hangHoa){
            res.status(200).render("loaihangs/notification", {
                message: "Không được phép xoá Loại hàng có tồn tại Hàng hoá"
            })
        }
        else {
            await Loaihang.destroy({
                where: {
                    maLoai,
                }
            });
            res.status(200).render("loaihangs/notification", {
                message: "Thao tác thành công",
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllLoaiHang,
    createLoaiHang,
    updateLoaiHang,
    deleteLoaiHang,
    edit,create
};
