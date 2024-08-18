
// schema and model for user

const mongoose = require("mongoose");

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

userSchema.pre("save", function(){
    this.confirmPass = undefined
})

const User = mongoose.model("User", userSchema);

module.exports = User;