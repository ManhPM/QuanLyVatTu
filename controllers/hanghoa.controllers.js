const { Hanghoa, Kho, Loaihang, CTHoadonnhap, CTHoadonxuat } = require("../models");
const { QueryTypes } = require('sequelize');

const createHangHoa = async (req, res) => {
    const { tenHH, maLoai, donViTinh, xuatXu, img} = req.body;
    try {
        const newHangHoa = await Hanghoa.create({ tenHH, donViTinh, xuatXu, maLoai, img});
        res.status(201).render("hanghoas/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("hanghoas/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const getAllHangHoa = async (req, res) => {
    try {
        const hangHoaList = await Hanghoa.sequelize.query(
            "SELECT DISTINCT HH.*, K.*, LH.tenLoai FROM hanghoas as HH, khos as K, hoadonnhaps as HDN, cthoadonnhaps as CTHDN, loaihangs as LH where HH.maHH = CTHDN.maHH AND CTHDN.maHDN = HDN.maHDN AND HDN.maKho = K.maKho AND LH.maLoai = HH.maLoai", 
        { 
            type: QueryTypes.SELECT,
            raw: true
        });
        res.status(200).render("hanghoas/show", {
            hanghoas: hangHoaList,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllHangHoaChuaCoHoaDon = async (req, res) => {
    try {
        const hangHoaList = await Hanghoa.sequelize.query(
            "SELECT DISTINCT HH.*, LH.tenLoai FROM hanghoas as HH, khos as K, loaihangs as LH WHERE (NOT exists(SELECT maHH FROM cthoadonnhaps as CTHDN WHERE HH.maHH = CTHDN.maHH)) AND LH.maLoai = HH.maLoai", 
        { 
            type: QueryTypes.SELECT,
            raw: true
        });
        res.status(200).render("hanghoas/show2", {
            hanghoas: hangHoaList,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateHangHoa = async (req, res) => {
    const { maHH } = req.params;
    const { tenHH, maLoai, donViTinh, xuatXu, img } = req.body;
    try {
        const hangHoaUpdate = await Hanghoa.findOne({
            where: {
                maHH,
            }
        })
        hangHoaUpdate.tenHH = tenHH;
        hangHoaUpdate.maLoai = maLoai;
        hangHoaUpdate.donViTinh = donViTinh;
        hangHoaUpdate.xuatXu = xuatXu;
        hangHoaUpdate.img = img;
        await hangHoaUpdate.save();
        res.status(200).render("hanghoas/notification", {
            message: "Thao tác thành công!"
        });
    } catch (error) {
        res.status(500).render("hanghoas/notification", {
            message: "Thao tác thất bại!"
        });
    }
}

const deleteHangHoa = async (req, res) => {
    const {maHH} = req.params
    const ctHoaDonNhap = await CTHoadonnhap.findOne({
        where: {
            maHH,
        }
    })
    const ctHoaDonXuat = await CTHoadonxuat.findOne({
        where: {
            maHH,
        }
    })
    try {
        if(ctHoaDonNhap || ctHoaDonXuat){
            res.status(200).render("hanghoas/notification", {
                message: "Không được phép xoá Hàng hoá có tồn tại Hoá đơn nhập hoặc xuất"
            })
        }
        else {
            await Hanghoa.destroy({
                where: {
                    maHH,
                }
            });
            res.status(200).render("hanghoas/notification", {
                message: "Thao tác thành công",
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const edit = async (req, res, next) => {
    const { maHH } = req.params 
    const hangHoa = await Hanghoa.findOne({
        where: {
            maHH,
        },
        raw: true
    })
    const loaiHangList = await Loaihang.findAll({raw: true});
    res.status(200).render("hanghoas/formupdate",{
        hanghoas: hangHoa,
        loaihangs: loaiHangList,
    });
}

const create = async (req, res, next) => { 
    const loaiHangList = await Loaihang.findAll({raw: true});
    res.status(200).render("hanghoas/createform",{
        loaihangs: loaiHangList,
    });
}

module.exports = {
    getAllHangHoa,
    createHangHoa,
    updateHangHoa,
    deleteHangHoa,
    edit,create,
    getAllHangHoaChuaCoHoaDon
};
