const express = require("express");
const productController = require("./../controllers/productController");

const router = express.Router();

// router.param("id", productController.checkID);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router
  .route("/:id")
  .get(productController.getOneProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = router;
