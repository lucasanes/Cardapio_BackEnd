const { Router } = require("express");
const userRouters = Router();

const CreateUserController = require("../modules/user/CreateUser/CreateUserController");
const createUserController = new CreateUserController();

const EditUserController = require("../modules/user/EditUser/EditUserController");
const editUserController = new EditUserController();

const LoginController = require("../modules/user/Login/LoginController");
const loginController = new LoginController();

const VerifyTokenController = require("../modules/user/VerifyToken/VerifyTokenController");
const verifyTokenController = new VerifyTokenController();

userRouters.post("/", createUserController.handle);
userRouters.put("/:id", editUserController.handle);
userRouters.post("/login", loginController.handle);
userRouters.post("/token", verifyTokenController.handle);

module.exports = userRouters;
