const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  description: {
    type: String,
    trim: true,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// productSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
