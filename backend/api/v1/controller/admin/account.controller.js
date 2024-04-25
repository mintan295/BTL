const md5 = require("md5");

const Account = require("../../../../models/account.model");

const generate = require("../../../../helpers/generate");

module.exports.index = async (req, res) => {
  try {
    const accounts = await Account.find({
      deleted: false,
    });
    res.json({
      success: true,
      accounts: accounts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách tài khoản admin",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existAccount = await Account.findOne({
      _id: req.params.idAccount,
      deleted: false,
    });
    if (!existAccount) {
      res.json({
        success: false,
        message: "Mã nhân viên không hợp lệ",
      });
      return;
    }
    res.json({
      success: true,
      account: existAccount,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi chi tiết tài khoản admin",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existAccount = await Account.findOne({
      _id: req.params.idAccount,
      deleted: false,
    });
    if (!existAccount) {
      res.json({
        success: false,
        message: "Account Id không tồn tại",
      });
      return;
    }
    await Account.updateOne(
      {
        _id: req.params.idAccount,
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
      message: "Lỗi đổi trạng thái tài khoản admin",
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    const existAccount = await Account.findOne({
      accountId: req.body.accountId,
      deleted: false,
    });
    if (existAccount) {
      res.json({
        success: false,
        message: "Mã số nhân viên đã tồn tại",
      });
      return;
    }
    const tokenAdmin = generate.generateRandomString(16);
    req.body.tokenAdmin = tokenAdmin;

    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();

    res.json({
      success: true,
      message: "Tạo tài khoản thành công",
      tokenAdmin: tokenAdmin,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tạo tài khoản admin",
    });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const existAccount = await Account.findOne({
      _id: req.params.idAccount,
      deleted: false,
    });
    if (!existAccount) {
      res.json({
        success: false,
        message: "Mã nhân viên không hợp lệ",
      });
      return;
    }
    if (!req.body.password) {
      delete req.body.password;
    } else {
      req.body.password = md5(req.body.password);
    }

    await Account.updateOne(
      {
        _id: req.params.idAccount,
        deleted: false,
      },
      req.body
    );
    const accountNew = await Account.findOne({
      _id: req.params.idAccount,
      deleted: false,
    });
    res.json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      account: accountNew,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật tài khoản admin",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const existAccount = await Account.findOne({
      _id: req.params.idAccount,
      deleted: false,
    });
    if (!existAccount) {
      res.json({
        success: false,
        message: "Mã nhân viên không hợp lệ",
      });
      return;
    }
    await Account.updateOne(
      {
        _id: req.params.idAccount,
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
      message: "Lỗi xóa tài khoản admin",
    });
  }
};
