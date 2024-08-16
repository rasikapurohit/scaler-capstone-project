const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: true,
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        validate: {
            validator: function (val) {
                return val > 0;
            },
            message: "Price must be greater than 0"
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: {
                values: ["electronics", "fashion", "books"],
                message: "Category is either: electronics, fashion, books"
            }
        },
        image: {
            type: String,
        },
        discount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val < this.price;
                },
                message: "Discount must be less than the price"
            }
        },
        averageRating: {
            type: Number,
            default: 0,
            min: [0, "Rating must be at least 0"],
            max: [5, "Rating must be at most 5"]
        },
    },
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;