require("express-async-errors");
const express = require("express");
const routers = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");
const prisma = require("./modules/database/prisma");
require("dotenv").config();
const simpleGit = require("simple-git")

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

app.post('/webhook', (req, res) => {
  // Executar o comando git pull no diretório do repositório
  simpleGit("D:/Users/Lucas/Desktop/Programador/ProjetoCardapio/Cardapio_BackEnd")  // Substitua pelo caminho correto do repositório no sistema do colaborador
    .pull((err, update) => {
      if (err) {
        console.error('Erro ao executar git pull:', err);
        res.sendStatus(500);
      } else {
        if (update && update.summary.changes) {
          console.log('Repositório atualizado');
          res.sendStatus(200);
        } else {
          console.log('Nenhuma alteração no repositório');
          res.sendStatus(204);
        }
      }
    });
});

app.listen(process.env.PORT || 8080, "0.0.0.0", () =>
  console.log("Server is running")
);
