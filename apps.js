const { json } = require('body-parser');
const express = require('express');
require("dotenv").config(); // will help to red configurations in env file and make them avaibvale in he process.env
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require('os');
const short = require("short-uuid");

// db connection

mongoose.connect(process.env.DB_URL).then((connection) => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err)
});

// end of db connection

// SCHEMA

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    confirmPass: {
        type: String,
        required: true,
        minlength:8,
        validate: function(){
            return this.password === this.confirmPass
        },
        message: "Password and confirm password should be same"
    },
    createdAt:Date,
    id: String
});

// MODEL

const User = mongoose.model("User", userSchema);

// using model, start talking with DB





// console.log(process.env.PORT);
const PORT = process.env.PORT || 3300;

const app = express();
const data = fs.readFileSync("./data.json", "utf-8");
const userData = JSON.parse(data);

app.use(express.json());

// custom middleware
app.use((req,res,next) => {
    console.log(`${req.method} request to ${req.url}`)
    //console.log(req)
    next();
})

// app.use((req, res) => {
//     res.status(200).send("This should print you something");
// })

app.get("/api/user", (req, res) => { 
    try {
        let msg = "";
        if(userData.length == 0){
            msg = "No data found";
        }
        else {
            msg = "data found";
        }
        res.json({ 
            status: msg, 
            statusCode: 200,
            data: userData
        });
    }
    catch(err) {
            res.status(500).json({
                status: 500,
                message: err.message
            })
    }
});


app.post("/api/user", createUserHandler);

async function createUserHandler(req,res){

    try {
        const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty){
        res.status(400).json({
            status:400,
            message:"Body cannnot be empty"
        });
    } 
    else {
        // userDetails.id = id;
        console.log("user => ", userDetails);
       const user = await User.create(userDetails);
       res.status(201).json({
        status:201,
        message:"User created!",
        data:user
    });
    }
    } catch (err) {
        console.log(err)
    }
    

}


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