const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const publisherSchema = new mongoose.Schema(
  {
    publisherId: String,
    fullName: String,
    address: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: {
      type: String,
      slug: "fullName",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Publisher = mongoose.model("Publisher", publisherSchema, "publishers");

module.exports = Publisher;
