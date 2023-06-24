const { Router } = require("express");
const userRouters = require("./user.routes");
const categoriaRouters = require("./categoria.routes");
const routers = Router();

const GetAllController = require("../modules/all/GetAll/GetAllController");
const getAllController = new GetAllController();

routers.use("/user", userRouters);
routers.use("/categoria", categoriaRouters);

routers.get("/getall", getAllController.handle);

module.exports = routers;