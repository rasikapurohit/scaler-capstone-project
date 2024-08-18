const express = require('express');
const { getProductHandler, createProductHandler, getProductByIdHandler, deleteProductHandler, updateProductHandler } = require('../controllers/productController');

const productRouter = express.Router();

//paths
productRouter.get("/", getProductHandler);
productRouter.post("/", createProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.delete("/:id", deleteProductHandler);
productRouter.put("/:id", updateProductHandler);

module.exports = productRouter;
