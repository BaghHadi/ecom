const Product = require("./../models/productModel.js");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct = factory.updateOne(Product);
