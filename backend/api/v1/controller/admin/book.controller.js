const Book = require("../../../../models/book.model");

module.exports.index = async (req, res) => {
  try {
    const books = await Book.find({
      deleted: false,
    });
    res.json({
      success: true,
      books: books,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách sách",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    res.json({
      success: true,
      book: existBook,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xem chi tiết sách",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Book Id không tồn tại",
      });
      return;
    }
    await Book.updateOne(
      {
        _id: req.params.idBook,
        deleted: false,
      },
      {
        status: req.params.status === "active" ? "inactive" : "active",
      }
    );
    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi đổi trạng thái sách",
    });
  }
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const existBook = await Book.findOne({
      bookId: req.body.bookId,
      deleted: false,
    });
    if (existBook) {
      res.json({
        success: false,
        message: "Book Id đã tồn tại",
      });
      return;
    }
    if (req.body.stock) {
      req.body.stock = parseInt(req.body.stock);
    }
    if (req.body.publicYear) {
      req.body.publicYear = parseInt(req.body.publicYear);
    }
    const book = new Book(req.body);
    await book.save();

    res.json({
      success: true,
      message: "Tạo sách mới thành công!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo mới sách",
    });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    if (req.body.stock) {
      req.body.stock = parseInt(req.body.stock);
    }
    if (req.body.publicYear) {
      req.body.publicYear = parseInt(req.body.publicYear);
    }
    await Book.updateOne(
      {
        _id: req.params.idBook,
        deleted: false,
      },
      req.body
    );

    const bookNew = await Book.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật thành công",
      book: bookNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi chỉnh sửa sách",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      _id: req.params.idBook,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Mã sách không tồn tại",
      });
      return;
    }
    await Book.updateOne(
      { _id: req.params.idBook, deleted: false },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      success: true,
      message: "Xóa sách thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xóa sách",
    });
  }
};
