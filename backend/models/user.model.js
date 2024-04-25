const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    avatar: String,
    birthYear: Number,
    sex: String,
    address: String,
    phone: String,
    status: String,
    password: String,
    tokenUser: String,
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

const User = mongoose.model("User", userSchema, "clients");

module.exports = User;
