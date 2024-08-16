const { json } = require('body-parser');
const express = require('express');
require("dotenv").config(); // will help to red configurations in env file and make them avaibvale in he process.env
const mongoose = require("mongoose");
// const User = require("./models/userModel.js");
// const { createUserHandler } = require("./controllers/userController.js");
const Product = require("./models/productModel.js");
// const {
//     checkInput,
//     getProductHandler,
//     createProductHandler,
//     updateProductHandler,
//     deleteProductHandler
// } = require("./models/productModel.js");




// db connection

mongoose.connect(process.env.DB_URL).then((connection) => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err)
});

// end of db connection

const PORT = process.env.PORT || 3300;

const app = express();
app.use(express.json());

const checkInput = function (req, res, next) {
    console.log("req method => ", req.method);

    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty) {
        res.status(400).json({
            status: 400,
            message: "Body cannnot be empty"
        });
    } else {
        next();
    }
}

 async function getProductHandler(req, res) {
    try {
        const productData = await Product.find();

    if (productData.length == 0) {
        res.status(404).json({
            status: 404,
            message: "No data found"
        });
    }
    else {
        res.status(200).json({
            status: 200,
            message: "Data found",
            data: productData
        });
    }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}

async function createProductHandler(req, res) {
    try {
        const productDetails = req.body;
        console.log(productDetails)
        const product = await Product.create(productDetails);
        res.status(201).json({
            status: 201,
            message: "Product created!",
            data: product
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
        
    }
}

//product handlers
app.get("/api/product", checkInput, getProductHandler);
app.post("/api/product", checkInput, createProductHandler);
// app.put("/api/product/:id", updateProductHandler);
// app.delete("/api/product/:id", deleteProductHandler);

// custom middleware
app.use((req,res,next) => {
    console.log(`${req.method} request to ${req.url}`)
    //console.log(req)
    next();
})

// app.use((req, res) => {
//     res.status(200).send("This should print you something");
// })

// app.get("/api/user", (req, res) => { 
//     try {
//         let msg = "";
//         if(userData.length == 0){
//             msg = "No data found";
//         }
//         else {
//             msg = "data found";
//         }
//         res.json({ 
//             status: msg, 
//             statusCode: 200,
//             data: userData
//         });
//     }
//     catch(err) {
//             res.status(500).json({
//                 status: 500,
//                 message: err.message
//             })
//     }
// });


// app.post("/api/user", createUserHandler);


// app.post("/api/user", (req, res) => { 
//     // console.log(req.body);
//     // const id = short.generate();
//     // const userDetails = req.body;

//     // userDetails.id = id;
//     console.log("new user => ", userDetails)
//     // userData.push(userDetails);

//     // fs.writeFile("data.json", JSON.stringify(userData), (err) => {
//     //     if (err) console.log(err.message)
//     // })
//     // res.json({ 
//     //     status: 200,
//     //     message: "user added",
//     //     data: userDetails
//     // }); 
//     const  User.create(userDetails);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})