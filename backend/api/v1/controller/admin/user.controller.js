const md5 = require("md5");

const User = require("../../../../models/user.model");

const generate = require("../../../../helpers/generate");

module.exports.index = async (req, res) => {
  try {
    const users = await User.find({
      deleted: false,
    });
    res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách người dùng",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existUser = await User.findOne({
      _id: req.params.idUser,
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không hợp lệ",
      });
      return;
    }
    res.json({
      success: true,
      user: existUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi chi tiết người dùng",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existUser = await User.findOne({
      _id: req.params.idUser,
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "User Id không tồn tại",
      });
      return;
    }
    await User.updateOne(
      {
        _id: req.params.idUser,
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
      message: "Lỗi đổi trạng thái người dùng",
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    const existUser = await User.findOne({
      userId: req.body.userId,
      deleted: false,
    });
    if (existUser) {
      res.json({
        success: false,
        message: "Mã số người dùng đã tồn tại",
      });
      return;
    }
    if (req.body.birthYear) {
      req.body.birthYear = parseInt(req.body.birthYear);
    }
    const tokenUser = generate.generateRandomString(16);
    req.body.tokenUser = tokenUser;

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    res.json({
      success: true,
      message: "Tạo tài khoản thành công",
      tokenUser: tokenUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo tài khoản người dùng",
    });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const existUser = await User.findOne({
      _id: req.params.idUser,
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không hợp lệ",
      });
      return;
    }
    if (req.body.birthYear) {
      req.body.birthYear = parseInt(req.body.birthYear);
    }
    if (!req.body.password) {
      delete req.body.password;
    } else {
      req.body.password = md5(req.body.password);
    }

    await User.updateOne(
      {
        _id: req.params.idUser,
        deleted: false,
      },
      req.body
    );
    const userNew = await User.findOne({
      _id: req.params.idUser,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      user: userNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật tài khoản người dùng",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const existUser = await User.findOne({
      _id: req.params.idUser,
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không hợp lệ",
      });
      return;
    }
    await User.updateOne(
      {
        _id: req.params.idUser,
        deleted: false,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      success: true,
      message: "Xóa tài khoản thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi xóa tài khoản người dùng",
    });
  }
};
