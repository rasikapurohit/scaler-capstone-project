const express = require('express');
const { getAllUsersHandler, createUserHandler, getUserByIdHandler, deleteUserByIdHandler, updateUserByIdHandler } = require('../controllers/userController');

userRouter = express.Router();

//paths
userRouter.get("/", getAllUsersHandler);
userRouter.post("/", createUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);
userRouter.put("/:id", updateUserByIdHandler);

module.exports = userRouter;