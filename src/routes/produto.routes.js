const { Router } = require("express");
const produtoRouters = Router();

const CreateProdutoController = require("../modules/produto/CreateProduto/CreateProdutoController");
const createProdutoController = new CreateProdutoController();

const EditProdutoController = require("../modules/produto/EditProduto/EditProdutoController");
const editProdutoController = new EditProdutoController();

const DeleteProdutoController = require("../modules/produto/DeleteProduto/DeleteProdutoController");
const deleteProdutoController = new DeleteProdutoController();

const GetProdutoController = require("../modules/produto/GetProduto/GetProdutoController");
const getProdutoController = new GetProdutoController();

produtoRouters.post("/", createProdutoController.handle);
produtoRouters.put("/:id", editProdutoController.handle);
produtoRouters.delete("/:id", deleteProdutoController.handle);
produtoRouters.get("/:id", getProdutoController.handle);

module.exports = produtoRouters;
