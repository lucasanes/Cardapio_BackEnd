require("express-async-errors");
const express = require("express");
const routers = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");
const prisma = require("./modules/database/prisma");
require("dotenv").config();
const uploadConfig = require("./config/upload");

//teste

const app = express();

const allowedOrigins = [
  'https://cardapioadmin.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routers)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      msg: error.msg
    });
  }
  return response.status(500).json({
    status: 500,
    msg: "Erro interno do servidor!"
  });
});

app.use('/', express.static(uploadConfig.UPLOADS_FOLDER))

app.listen(process.env.PORT || 8080, () =>
  console.log("Server => On-line in " + process.env.PORT)
);
