const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  link: String,
  name: String,
  aliases: [String],
  price: Number,
  date: Date,
});

exports.ItemSchema = ItemSchema;

exports.Item = mongoose.model("Item", ItemSchema, "Item");
