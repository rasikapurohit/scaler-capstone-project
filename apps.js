const { json } = require('body-parser');
const express = require('express');
require("dotenv").config(); // will help to red configurations in env file and make them avaibvale in he process.env
const fs = require("fs");
const short = require("short-uuid");


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

app.get("/api/usera", (req, res) => { 
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

app.post("/api/user", (req, res) => { 
    console.log(req.body);
    const id = short.generate();
    const userDetails = req.body;

    userDetails.id = id;
    console.log("new user => ", userDetails)
    userData.push(userDetails);

    fs.writeFile("data.json", JSON.stringify(userData), (err) => {
        if (err) console.log(err.message)
    })
    res.json({ 
        status: 200,
        message: "user added",
        data: userDetails
    }); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})