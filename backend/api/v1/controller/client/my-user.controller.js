const User = require("../../../../models/user.model");

module.exports.myUser = async (req, res) => {
  try {
    const existUser = await User.findOne({
      tokenUser: req.params.tokenUser,
      status: "active",
      deleted: false,
    });
    if (!existUser) {
      res.json({
        success: false,
        message: "Token User không hợp lệ",
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
      message: "Lỗi lấy thông tin User",
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const existUser = await User.findOne({
      userId: req.body.userId,
      status: "active",
      deleted: false,
    });

    if (!existUser) {
      res.json({
        success: false,
        message: "Mã người dùng không hợp lệ",
      });
      return;
    }
    if (req.body.birthYear !== null) {
      req.body.birthYear = parseInt(req.body.birthYear);
    }
    await User.updateOne(
      {
        userId: req.body.userId,
        deleted: false,
      },
      req.body
    );
    const userNew = await User.findOne({
      userId: req.body.userId,
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
