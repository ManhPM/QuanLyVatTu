const { Taikhoan, Nhanvien, Phanquyen } = require("../models");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const create = async (req, res, next) => {
  const { username } = req;
  const quyen = await Phanquyen.sequelize.query(
    "SELECT PQ.* FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND TK.username = :username",
    {
      replacements: { username: `${username}` },
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  if(quyen[0].maQuyen == 3){
    const nhanVienList = await Nhanvien.sequelize.query(
      "SELECT NV.* FROM nhanviens as NV WHERE NOT EXISTS(SELECT TK.maNV FROM taikhoans as TK WHERE NV.maNV = TK.maNV)",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (nhanVienList[0]) {
      res.status(200).render("taikhoans/createform", {
        nhanviens: nhanVienList,
      });
    } else {
      res.status(200).render("taikhoans/notification", {
        message: "Tất cả nhân viên đã có tài khoản!",
      });
    }
  }
  else if(quyen[0].maQuyen == 1){
    const nhanVienList = await Nhanvien.sequelize.query(
      "SELECT NV.* FROM nhanviens as NV WHERE NV.maQuyen = 2 AND NOT EXISTS(SELECT TK.maNV FROM taikhoans as TK WHERE NV.maNV = TK.maNV)",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (nhanVienList[0]) {
      res.status(200).render("taikhoans/createform", {
        nhanviens: nhanVienList,
      });
    } else {
      res.status(200).render("taikhoans/notification", {
        message: "Tất cả nhân viên đã có tài khoản!",
      });
    }
  }
};

const createTaiKhoan = async (req, res) => {
  const { username, maNV, password } = req.body;
  try {
    const taiKhoan = await Taikhoan.findOne({
      where: {
        maNV,
      },
    });
    if (taiKhoan) {
      res.status(200).render("taikhoans/notification", {
        message: "Nhân viên đã tồn tại tài khoản",
      });
    } else {
      //tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      //mã hoá salt + password
      const hashPassword = bcrypt.hashSync(password, salt);
      const newTaiKhoan = await Taikhoan.create({
        username,
        maNV,
        password: hashPassword,
      });
      if (newTaiKhoan) {
        res.status(201).render("taikhoans/notification", {
          message: "Thao tác thành công!",
        });
      }
    }
  } catch (error) {
    res.status(201).render("taikhoans/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const taiKhoan = await Taikhoan.findOne({
    where: {
      username,
    },
  });
  const isAuth = bcrypt.compareSync(password, taiKhoan.password);
  if (isAuth) {
    const token = jwt.sign({ username: taiKhoan.username }, "manhpham2k1", {
      expiresIn: 60 * 60 * 6,
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .render("taikhoans/formlogin", {
        message: "Đăng nhập thành công!",
        flag: 1,
      });
  } else {
    res.status(201).render("taikhoans/formlogin", {
      message: "Sai thông tin đăng nhập!",
    });
  }
};

const getAllTaiKhoan = async (req, res) => {
  const { tenNV } = req.query;
  if (tenNV) {
    try {
      const taiKhoanList = await Taikhoan.sequelize.query(
        "SELECT TK.*, NV.tenNV, PQ.tenQuyen FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND NV.tenNV LIKE :tenNV",
        {
          replacements: { tenNV: `%${tenNV}%` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).render("taikhoans/show", {
        taikhoans: taiKhoanList,
      });
    } catch (error) {
      res.status(500).render("taikhoans/show");
    }
  } else {
    try {
      const taiKhoanList = await Taikhoan.sequelize.query(
        "SELECT TK.*, NV.tenNV, PQ.tenQuyen FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).render("taikhoans/show", {
        taikhoans: taiKhoanList,
      });
    } catch (error) {
      res.status(500).render("taikhoans/show");
    }
  }
};

const getDetailTaiKhoan = async (req, res) => {
  const { username } = req.params;
  try {
    const taiKhoan = await Taikhoan.findOne({
      where: {
        username,
      },
    });
    res.status(200).send(taiKhoan);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTaiKhoan = async (req, res) => {
  const { username } = req;
  const { oldpassword, newpassword, repeatpassword } = req.body;
  try {
    const taiKhoanUpdate = await Taikhoan.findOne({
      where: {
        username,
      },
    });
    const isAuth = bcrypt.compareSync(oldpassword, taiKhoanUpdate.password);
    if (isAuth) {
      if (newpassword == repeatpassword) {
        //tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        //mã hoá salt + password
        const hashPassword = bcrypt.hashSync(newpassword, salt);
        if (taiKhoanUpdate.active == 0) {
          taiKhoanUpdate.active = 1;
        }
        taiKhoanUpdate.password = hashPassword;
        await taiKhoanUpdate.save();
        res.status(200).render("taikhoans/notification", {
          message: "Thao tác thành công!",
        });
      } else {
        res.status(200).render("taikhoans/formupdate", {
          message: "Mật khẩu lặp lại không đúng!",
          flag: 0,
        });
      }
    } else {
      res.status(200).render("taikhoans/formupdate", {
        message: "Mật khẩu không chính xác!",
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).render("taikhoans/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const deleteTaiKhoan = async (req, res) => {
  const { username } = req.params;
  try {
    await Taikhoan.destroy({
      where: {
        username,
      },
    });
    res.status(200).render("taikhoans/notification", {
      message: "Thao tác thành công!",
    });
  } catch (error) {
    res.status(200).render("taikhoans/notification", {
      message: "Thao tác thất bại!",
    });
  }
};

const edit = async (req, res, next) => {
  res.status(200).render("taikhoans/formupdate", {});
};
const logout = async (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .render("taikhoans/formlogin", { message: "Đăng xuất thành công!" });
};

const forgotPassword = async (req, res, next) => {
  const { username } = req.body;
  const randomID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  const taiKhoan = await Taikhoan.sequelize.query(
    "SELECT NV.email FROM nhanviens as NV, taikhoans as TK WHERE TK.maNV = NV.maNV AND TK.username = :username",
    {
      type: QueryTypes.SELECT,
      replacements: {
        username: username,
      },
    }
  );
  if (taiKhoan) {
    const result = await Taikhoan.sequelize.query(
      "UPDATE taikhoans SET forgot = :randomID WHERE username = :username",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          randomID: randomID,
          username: username,
        },
      }
    );
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "n19dccn107@student.ptithcm.edu.vn", // generated ethereal user
        pass: "bqztpfkmmbpzmdxl", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "n19dccn107@student.ptithcm.edu.vn", // sender address
      to: "phammanhbeo2001@gmail.com", // list of receivers
      subject: "FORGOT PASSWORD", // Subject line
      text: "FORGOT PASSWORD", // plain text body
      html: `Mã xác nhận của bạn: ${randomID}`, // html body
    });
    res.status(200).render("taikhoans/forgotpw", {
      message: `Mã xác minh đã được gửi về email: ${taiKhoan[0].email}  vui lòng kiểm tra hòm thư!`,
      flag: 1,
    });
  } else {
    res.status(200).render("taikhoans/forgotpw", {
      message: `Không tìm thấy username!`,
      flag: 0,
    });
  }
};

const vertify = async (req, res, next) => {
  const { vertifyID } = req.body;
  const taiKhoan = await Taikhoan.findOne({
    where: {
      forgot: vertifyID,
    },
    raw: true,
  });
  if (taiKhoan) {
    res.status(200).render("taikhoans/vertifypw", {
      username: taiKhoan.username,
    });
  } else {
    res.status(200).render("taikhoans/forgotpw", {
      message: `Mã xác nhận không chính xác!`,
      flag: 1,
    });
  }
};

const accessForgotPassword = async (req, res, next) => {
  const { username } = req.params;
  const { password, repeatpassword } = req.body;
  if (password != repeatpassword) {
    res.status(200).render("taikhoans/vertifypw", {
      message: "Mật khẩu không khớp!",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    //mã hoá salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
      const taiKhoanUpdate = await Taikhoan.findOne({
        where: {
          username,
        },
      });
      taiKhoanUpdate.password = hashPassword;
      taiKhoanUpdate.forgot = 0;
      if (taiKhoanUpdate.active == 0) {
        taiKhoanUpdate.active = 1;
      }
      await taiKhoanUpdate.save();
      res.status(200).render("taikhoans/formlogin", {
        message: "Lấy lại mật khẩu thành công!",
      });
    } catch (error) {
      res.status(500).render("taikhoans/notification", {
        message: "Thao tác thất bại!",
      });
    }
  }
};

const getforgot = async (req, res, next) => {
  res.status(200).render("taikhoans/forgotpw", {
    step: 0,
  });
};
const formlogin = async (req, res, next) => {
  res.status(200).render("taikhoans/formlogin");
};

const information = async (req, res) => {
  const { username } = req;
  const infors = await Taikhoan.sequelize.query(
    "SELECT NV.*, PQ.tenQuyen FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND TK.username = :username",
    {
      type: QueryTypes.SELECT,
      replacements: {
        username: username,
      },
    }
  );
  res.status(200).render("infor", {
    infors: infors[0],
  });
};

module.exports = {
  getDetailTaiKhoan,
  createTaiKhoan,
  login,
  information,
  create,
  updateTaiKhoan,
  edit,
  logout,
  getAllTaiKhoan,
  deleteTaiKhoan,
  forgotPassword,
  getforgot,
  formlogin,
  vertify,
  accessForgotPassword,
};
