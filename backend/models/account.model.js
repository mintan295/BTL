const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountId: String,
    fullName: String,
    position: String,
    address: String,
    phone: String,
    password: String,
    status: String,
    tokenAdmin: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
