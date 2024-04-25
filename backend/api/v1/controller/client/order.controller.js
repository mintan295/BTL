const User = require("../../../../models/user.model");
const Book = require("../../../../models/book.model");
const Order = require("../../../../models/order.model");

module.exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
      deleted: false,
    });
    const fullOrder = [];
    for (const order of orders) {
      const user = await User.findOne({
        userId: order.userId,
        status: "active",
        deleted: false,
      }).select("userId fullName");
      const book = await Book.findOne({
        bookId: order.bookId,
        deleted: false,
      }).select("bookId thumbnail bookName stock");
      fullOrder.push({
        order: order,
        user: user,
        book: book,
      });
    }
    res.json({
      success: true,
      orders: fullOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách mượn sách",
    });
  }
};

module.exports.order = async (req, res) => {
  try {
    const existUser = await User.findOne({
      userId: req.body.userId,
      status: "active",
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: 404,
        message: "User Id không tồn tại",
      });
      return;
    }
    const existBook = await Book.findOne({
      bookId: req.body.bookId,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: 404,
        message: "Book Id không tồn tại",
      });
      return;
    }
    req.body.quantity = parseInt(req.body.quantity);
    const existOrder = await Order.findOne({
      userId: existUser.userId,
      bookId: existBook.bookId,
      deleted: false,
    });
    if (!existOrder) {
      const order = new Order(req.body);
      await order.save();
      const stockCurrent = existBook.stock - order.quantity;
      if (stockCurrent >= 0) {
        await Book.updateOne(
          {
            bookId: req.body.bookId,
            status: "active",
            deleted: false,
          },
          {
            stock: stockCurrent,
          }
        );
      }
      res.json({
        success: true,
        order: order,
      });
      return;
    }
    await Order.updateOne(
      {
        userId: existUser.userId,
        bookId: existBook.bookId,
        deleted: false,
      },
      {
        quantity: existOrder.quantity + req.body.quantity,
      }
    );

    const orderNew = await Order.findOne({
      userId: existUser.userId,
      bookId: existBook.bookId,
      deleted: false,
    });
    console.log(orderNew.quantity);
    console.log(existBook.stock);
    const stockCurrent = existBook.stock - req.body.quantity;
    console.log(stockCurrent);
    if (stockCurrent >= 0) {
      await Book.updateOne(
        {
          bookId: req.body.bookId,
          status: "active",
          deleted: false,
        },
        {
          stock: stockCurrent,
        }
      );
    } else {
      res.json({
        success: false,
        message: "Sản phẩm này đã hết hàng",
      });
      return;
    }
    res.json({
      success: true,
      order: orderNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo order sách",
    });
  }
};

module.exports.give = async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
      status: "active",
      deleted: false,
    });
    const book = await Book.findOne({
      bookId: req.body.bookId,
      status: "active",
      deleted: false,
    });
    if (!user) {
      res.json({
        success: false,
        message: "User Id không tồn tại",
      });
      return;
    }
    if (!book) {
      res.json({
        success: false,
        message: "Book Id không tồn tại",
      });
      return;
    }
    req.body.giveQuantity = parseInt(req.body.giveQuantity);
    const order = await Order.findOne({
      userId: req.body.userId,
      bookId: req.body.bookId,
      deleted: false,
    });
    if (!order) {
      res.json({
        success: false,
        message: "Order sách không tồn tại",
      });
      return;
    }
    console.log(order.quantity);
    console.log(req.body.giveQuantity);
    if (req.body.giveQuantity === order.quantity) {
      await Order.updateOne(
        {
          userId: req.body.userId,
          bookId: req.body.bookId,
          deleted: false,
        },
        { quantity: 0, deleted: false, deletedAt: new Date() }
      );
    } else {
      await Order.updateOne(
        {
          userId: req.body.userId,
          bookId: req.body.bookId,
          deleted: false,
        },
        { quantity: order.quantity - req.body.giveQuantity }
      );
    }
    await Book.updateOne(
      {
        bookId: req.body.bookId,
        deleted: false,
      },
      {
        stock: book.stock + req.body.giveQuantity,
        status: "active",
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật số lượng order va book",
    });
  }
};
