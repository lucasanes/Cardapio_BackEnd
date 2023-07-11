const { Router } = require("express");
const etcRouters = Router();

const multer = require("multer");
const uploadConfig = require('../config/upload')

const upload = multer(uploadConfig.MULTER)

const GetAllController = require("../modules/all/GetAll/GetAllController");
const getAllController = new GetAllController();

const UploadController = require("../modules/all/Upload/UploadController");
const uploadController = new UploadController();

const SendRecoveryController = require("../modules/recovery/SendRecovery/SendRecoveryController");
const sendRecoveryController = new SendRecoveryController();

const GetRecoveryController = require("../modules/recovery/GetRecovery/GetRecoveryController");
const getRecoveryController = new GetRecoveryController();

const DeleteRecoveryController = require("../modules/recovery/DeleteRecovery/DeleteRecoveryController");
const deleteRecoveryController = new DeleteRecoveryController();

etcRouters.get("/restaurante/:id", getAllController.handle);
etcRouters.post("/upload", upload.single("imagem"), uploadController.handle);
etcRouters.post("/sendrecovery", sendRecoveryController.handle);
etcRouters.post("/getrecovery", getRecoveryController.handle);
etcRouters.delete("/deleterecovery/:email", deleteRecoveryController.handle);

module.exports = etcRouters;
