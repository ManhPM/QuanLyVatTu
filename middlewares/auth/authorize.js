const { Taikhoan } = require("../../models");
const { QueryTypes } = require("sequelize");

const authorize = (arrType) => async (req, res, next) => {
    const { username } = req;
    const quyen = await Taikhoan.sequelize.query(
        "SELECT PQ.tenQuyen FROM nhanviens AS NV, taikhoans AS TK, phanquyens as PQ WHERE TK.maNV = NV.maNV AND TK.username = :username AND NV.maQuyen = PQ.maQuyen",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: `${username}`,
          },
        }
      );
    if(arrType.findIndex((ele) => ele === quyen[0].tenQuyen) > -1) {
        next();
    }else {
        res.status(403).render("nhacungcaps/notification", {
          message: "Bạn không có quyền sử dụng chức năng này!"
        });
    }
};

module.exports = {
    authorize,
}