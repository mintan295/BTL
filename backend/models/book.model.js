const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const bookSchema = new mongoose.Schema(
  {
    bookId: String,
    bookName: String,
    thumbnail: String,
    author: String,
    stock: Number,
    rate: String,
    description: String,
    idPublisher: String,
    publicYear: Number,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: {
      type: String,
      slug: "bookName",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;
