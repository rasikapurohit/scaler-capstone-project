const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: [true, "Product name should be unique"],
        maxLength: [40, "Product name should not exceed 40 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        validate: {
            validator: function () {
                return this.price > 0;
            },
            message: "Price should be greater than 0",
        },
    },
    categories: {
        required: true,
        type: [String],
    },
    images: [String],
    averageRating: {
        type: Number,
        default: 0,
        min:0,
        max:5
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            message: "Discount should be less than price",
        },
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        maxLength: [200, "Product description should not exceed 200 characters"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        validate: {
            validator: function () {
                return this.stock >= 0;
            },
            message: "Stock should be grater than equal to 0",
        },
    },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Review"
    },
    
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;