const { Router } = require("express");
const userRouters = require("./user.routes");
const categoriaRouters = require("./categoria.routes");
const produtoRouters = require("./produto.routes");
const etcRouters = require("./etc.routes");
const routers = Router();

routers.use("/user", userRouters);
routers.use("/categoria", categoriaRouters);
routers.use("/produto", produtoRouters);
routers.use("/etc", etcRouters);

module.exports = routers;