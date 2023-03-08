const { Item, Order, Order_detail } = require("../models");
const { QueryTypes, and } = require("sequelize");

const getAllOrder = async (req, res) => {
  try {
    const info = await Order.sequelize.query(
      "SELECT R.id_role FROM roles as R, accounts as A WHERE A.username = :username AND A.id_role = R.id_role",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (info[0].id_role == 1) {
      const customer = await Order.sequelize.query(
        "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const orderList = await Order.sequelize.query(
        "SELECT O.id_order, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT COUNT(id_item) FROM order_details WHERE isReviewed = 0 AND id_order = O.id_order) as reviewingCount, (SELECT SUM(OD.quantity*I.price) FROM order_details as OD, items as I WHERE I.id_item = OD.id_item AND O.id_order = OD.id_order) as total FROM orders as O WHERE O.id_customer = :id_customer ORDER BY O.datetime DESC, O.status ASC",
        {
          replacements: { id_customer: customer[0].id_customer },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json(orderList);
    } else {
      const orderList = await Order.sequelize.query(
          "SELECT O.id_order, C.name as name_customer, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT SUM(OD.quantity*I.price) FROM items as I, order_details as OD WHERE OD.id_item = I.id_item AND OD.id_order = O.id_order) as total, P.name as name_payment FROM orders as O, customers as C, payments as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment ORDER BY O.status ASC, O.id_order DESC",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json(orderList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllItemInOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const itemList = await Order.sequelize.query(
      "SELECT OD.*, I.image, I.name, I.price, (I.price*OD.quantity) as amount FROM orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const info = await Order.sequelize.query(
      "SELECT SUM((I.price*OD.quantity)) as total, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.status, P.name as name_payment FROM payments as P, orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND P.id_payment = O.id_payment AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({total: info[0].total, datetime: info[0].datetime, status: info[0].status, name_payment: info[0].name_payment, itemList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const confirmOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if(order.status != 1){
      const itemListInOrder = await Order_detail.findAll({
        where: {
          id_order,
        },
      });
      let i = 0;
      while (itemListInOrder[i]) {
        const updateQuantity = await Item.findOne({
          where: {
            id_item: itemListInOrder[i].id_item,
          },
        });
        if(updateQuantity.quantity >= itemListInOrder[i].quantity){
          updateQuantity.quantity =
          updateQuantity.quantity - itemListInOrder[i].quantity;
          await updateQuantity.save();
          i++;
        }
        else {
          order.status = 2;
          await order.save();
          res.status(400).json({ message: "Số lượng hàng còn lại không đủ. Tự động huỷ đơn!" });
        }
      }
      order.status = 1;
      await order.save();
      res.status(201).json({ message: "Xác nhận đơn hàng!" });
    }
    else {
      res.status(400).json({ message: "Thao tác thất bại. Đơn hàng đã được xác nhận!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const cancelOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if(order.status != 2){
      order.status = 2;
      await order.save();
      res.status(200).json({ message: "Đơn hàng đã được huỷ bỏ!" });
    }
    else {
      res.status(400).json({ message: "Thao tác thất bại. Đơn hàng đã được huỷ bỏ!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};
const thongKe = async (req, res) => {
  const { tuNgay, denNgay } = req.query
  try {
    if(tuNgay && denNgay){
      // Thống kê từ ngày tuNgay đến ngày denNgay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(quantity) FROM order_details WHERE id_item = OD.id_item) as sold, (SELECT SUM(quantity*I.price) FROM order_details WHERE id_item = OD.id_item) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 AND O.datetime between :tuNgay AND :denNgay ORDER BY sold DESC",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0 AND O.datetime between :tuNgay AND :denNgay",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );

      res.status(200).json({thongke: thongKe, total: info[0].total})
    }
    else {
      // Thống kê từ trước đến nay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(quantity) FROM order_details WHERE id_item = OD.id_item) as sold, (SELECT SUM(quantity*I.price) FROM order_details WHERE id_item = OD.id_item) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND T.id_type = I.id_type AND O.id_order = OD.id_order AND I.status != 0 AND O.status = 1 ORDER BY sold DESC",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({thongke: thongKe, total: info[0].total})
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};


module.exports = {
  getAllOrder,
  getAllItemInOrder,
  confirmOrder,
  cancelOrder,
  thongKe,
};
