const Product = require("../models/productModel");
const { getAllFactory,
    createElementFactory,
    getElementByIdFactory,
    checkInput,
    deleteElementByIdFactory,updateElementByIdFactory } = require('../utils/crudFactory.js');


const getProductHandler = getAllFactory(Product);

const createProductHandler = createElementFactory(Product);

const updateProductHandler = updateElementByIdFactory(Product);

const deleteProductHandler = deleteElementByIdFactory(Product);

const getProductByIdHandler = getElementByIdFactory(Product);



module.exports = {
    checkInput,
    getProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    getProductByIdHandler
}



// const checkInput = function (req, res, next) {
//     console.log("req method => ", req.method);

//     const userDetails = req.body;
//     const isEmpty = Object.keys(userDetails).length === 0;
//     if (isEmpty) {
//         res.status(400).json({
//             status: 400,
//             message: "Body cannnot be empty"
//         });
//     } else {
//         next();
//     }
// }

//  async function getProductHandler(req, res) {
//     try {
//         const productData = await Product.find();

//     if (productData.length == 0) {
//         res.status(404).json({
//             status: 404,
//             message: "No data found"
//         });
//     }
//     else {
//         res.status(200).json({
//             status: 200,
//             message: "Data found",
//             data: productData
//         });
//     }
//     } catch (err) {
//         res.status(500).json({
//             status: 500,
//             message: err.message
//         });
//     }
// }

// async function createProductHandler(req, res) {
//     try {
//         const productDetails = req.body;
//         console.log(productDetails)
//         const product = await Product.create(productDetails);
//         res.status(201).json({
//             status: 201,
//             message: "Product created!",
//             data: product
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 500,
//             message: err.message
//         });
        
//     }
// }

// async function updateProductHandler(req, res) {
//     try {
//         const id = req.params.id;
//         const productDetails = req.body;
//         const product = await Product.findByIdAndUpdate (id, productDetails, {new: true});
//         res.status(200).json({
//             status: 200,
//             message: "Product updated!",
//             data: product
//         });     
//         if (!product) {
//             res.status(404).json({
//                 status: 404,
//                 message: "Product not found"
//             });
//         } else {
//             res.status(200).json({
//                 status: 200,
//                 message: "Product updated!",
//                 data: product
//             });
//         }

//     }   catch (err) {    
//         res.status(500).json({
//             status: 500,
//             message: err.message
//         });
//     }       
// }

// async function deleteProductHandler(req, res) {
//     try {
//         const id = req.params.id;
//         const product = await Product.findByIdAndDelete(id);
//         if (!product) {
//             res.status(404).json({
//                 status: 404,
//                 message: "Product not found"
//             });
//         } else {
//             res.status(200).json({
//                 status: 200,
//                 message: "Product deleted!",
//                 data: product
//             });
//         }
//     } catch (err) {
//         res.status(500).json({
//             status: 500,
//             message: err.message
//         });
//     }
// }