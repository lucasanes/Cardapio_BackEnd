const { Router } = require("express");
const categoriaRouters = Router();

const CreateCategoriaController = require("../modules/categoria/CreateCategoria/CreateCategoriaController");
const createCategoriaController = new CreateCategoriaController();

const DeleteCategoriaController = require("../modules/categoria/DeleteCategoria/DeleteCategoriaController");
const deleteCategoriaController = new DeleteCategoriaController();

const GetCategoriasController = require("../modules/categoria/GetCategorias/GetCategoriasController");
const getCategoriasController = new GetCategoriasController();

const GetCategoriaController = require("../modules/categoria/GetCategoria/GetCategoriaController");
const getCategoriaController = new GetCategoriaController();

categoriaRouters.post("/", createCategoriaController.handle);
categoriaRouters.delete("/:id", deleteCategoriaController.handle);
categoriaRouters.get("/", getCategoriasController.handle);
categoriaRouters.get("/:id", getCategoriaController.handle);

module.exports = categoriaRouters;
