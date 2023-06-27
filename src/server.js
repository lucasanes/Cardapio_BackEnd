require("express-async-errors");
const express = require("express");
const routers = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");
const prisma = require("./modules/database/prisma");
require("dotenv").config();
const uploadConfig = require("./config/upload");

const app = express();

app.use(express.json());
app.use(routers)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      mensagem: error.mensagem
    });
  }
  return response.status(500).json({
    status: 500,
    mensagem: "Erro interno do servidor!"
  });
});

app.use(cors());

app.use('/', express.static(uploadConfig.UPLOADS_FOLDER))

app.listen(process.env.PORT || 8080, () =>
  console.log("Server => On-line")
);
