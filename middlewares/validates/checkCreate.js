const checkCreateTaiKhoan = (Model) => {
    return async (req, res, next) => {
        const {username} = req.body;
        const taiKhoan = await Model.findOne({
            where: {
                username,
            }
        })
        if(taiKhoan) {
            res.status(404).render("taikhoans/notification", {
                message: "username đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreateNhanVien = (Model) => {
    return async (req, res, next) => {
        const { email } = req.body;
        const nhanVien = await Model.findOne({
            where: {
                email,
            }
        })
        if(nhanVien) {
            res.status(404).render("nhanviens/notification", {
                message: "nhân viên đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreateNhaCungCap = (Model) => {
    return async (req, res, next) => {
        const { tenNCC } = req.body;
        const nhaCungCap = await Model.findOne({
            where: {
                tenNCC,
            }
        })
        if(nhaCungCap) {
            res.status(404).render("nhacungcaps/notification", {
                message: "nhà cung cấp đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreateLoaiHang = (Model) => {
    return async (req, res, next) => {
        const { tenLoai } = req.body;
        const loaiHang = await Model.findOne({
            where: {
                tenLoai,
            }
        })
        if(loaiHang) {
            res.status(404).render("loaihangs/notification", {
                message: "loại hàng đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreatePhanQuyen = (Model) => {
    return async (req, res, next) => {
        const { tenQuyen } = req.body;
        const phanQuyen = await Model.findOne({
            where: {
                tenQuyen,
            }
        })
        if(phanQuyen) {
            res.status(404).send(`Phân quyền đã tồn tại!`);
        }else {
            next();
        }
    };
};

const checkCreateKho = (Model) => {
    return async (req, res, next) => {
        const { tenKho } = req.body;
        const Kho = await Model.findOne({
            where: {
                tenKho,
            }
        })
        if(Kho) {
            res.status(404).render("khos/notification", {
                message: "Kho đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreateHangHoa = (Model) => {
    return async (req, res, next) => {
        const { tenHH } = req.body;
        const hangHoa = await Model.findOne({
            where: {
                tenHH,
            }
        })
        if(hangHoa) {
            res.status(404).render("hanghoas/notification", {
                message: "hàng hoá đã tồn tại!"
            });
        }else {
            next();
        }
    };
};

const checkCreateCTHoaDonNhap = (Model) => {
    return async (req, res, next) => {
        const { maHDN, maHH } = req.body;
        const ctHoaDonNhap = await Model.findOne({
            where: {
                maHDN,
                maHH,
            }
        })
        if(ctHoaDonNhap) {
            res.status(404).render("hoadonnhaps/notification", {
                message: "hoá đơn đã tồn tại hàng hoá!"
            });
        }else {
            next();
        }
    };
};

const checkCreateCTHoaDonXuat = (Model) => {
    return async (req, res, next) => {
        const { maHDX, maHH } = req.body;
        const ctHoaDonXuat = await Model.findOne({
            where: {
                maHDX,
                maHH,
            }
        })
        if(ctHoaDonXuat) {
            res.status(404).render("hoadonxuats/notification", {
                message: "hoá đơn đã tồn tại hàng hoá!"
            });
        }else {
            next();
        }
    };
};

const checkCreateKhachHang = (Model) => {
    return async (req, res, next) => {
        const { sdt } = req.body;
        const khachHang = await Model.findOne({
            where: {
                sdt,
            }
        })
        if(khachHang) {
            res.status(404).render("khachhangs/notification", {
                message: "khách hàng đã tồn tại!"
            });
        }else {
            next();
        }
    };
};
module.exports = {
    checkCreateTaiKhoan,
    checkCreateNhanVien,
    checkCreateNhaCungCap,
    checkCreateLoaiHang,
    checkCreatePhanQuyen,
    checkCreateKho,
    checkCreateHangHoa,
    checkCreateCTHoaDonNhap,
    checkCreateCTHoaDonXuat,
    checkCreateKhachHang

}