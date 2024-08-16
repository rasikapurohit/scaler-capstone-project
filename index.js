const express = require('express');
require("dotenv").config(); // will help to red configurations in env file and make them avaibvale in he process.env

// console.log(process.env.PORT);
const PORT = process.env.PORT || 3300;

const app = express();
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
    res.json({ 
        status: 'success', 
        statusCode: 200,
        data: { 
            name: "Jane Doe", 
            age: 30, 
        }, 
    }); 
});

app.post("/api/user", (req, res) => { 
    console.log(req.body);
    res.json({ 
        data: req.body 
    }); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})