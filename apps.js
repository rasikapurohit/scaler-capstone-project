const express = require('express');
require("dotenv").config(); // will help to red configurations in env file and make them avaibvale in he process.env
const mongoose = require("mongoose");


// routers
const userRouter = require("./routes/userRouters");
const productRouter = require("./routes/productRouter");

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

// custom middleware
app.use((req,res,next) => {
    console.log(`${req.method} request to ${req.url}`)
    next();
})

// user handlers
app.use("/api/user", userRouter);
// app.get("/api/user", getAllUsersHandler);
// app.post("/api/user", createUserHandler);
// app.get("/api/user/:id", getUserByIdHandler);
// app.delete("/api/user/:id", deleteUserByIdHandler);
// app.put("/api/user/:id", updateUserByIdHandler);

// product handlers
app.use("/api/product", productRouter);
// app.get("/api/product", getProductHandler);
// app.post("/api/product", createProductHandler);
// app.get("/api/product/:id", getProductByIdHandler);
// app.delete("/api/product/:id", deleteProductHandler);
// app.put("/api/product/:id", updateProductHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})