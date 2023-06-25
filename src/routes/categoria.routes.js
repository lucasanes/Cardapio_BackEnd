const { Router } = require("express");
const categoriaRouters = Router();

const CreateCategoriaController = require("../modules/categoria/CreateCategoria/CreateCategoriaController");
const createCategoriaController = new CreateCategoriaController();

const EditCategoriaController = require("../modules/categoria/EditCategoria/EditCategoriaController");
const editCategoriaController = new EditCategoriaController();

const DeleteCategoriaController = require("../modules/categoria/DeleteCategoria/DeleteCategoriaController");
const deleteCategoriaController = new DeleteCategoriaController();

const GetCategoriaController = require("../modules/categoria/GetCategoria/GetCategoriaController");
const getCategoriaController = new GetCategoriaController();

categoriaRouters.post("/", createCategoriaController.handle);
categoriaRouters.put("/:id", editCategoriaController.handle);
categoriaRouters.delete("/:id", deleteCategoriaController.handle);
categoriaRouters.get("/:id", getCategoriaController.handle);

module.exports = categoriaRouters;
