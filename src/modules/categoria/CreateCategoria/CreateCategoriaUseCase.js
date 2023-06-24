const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");

class CreateCategoriaUseCase {
  async execute({ nome, descricao, imagem }) {

    const data = await prisma.categoria.create({
      data: {
        nome, 
        descricao,
        imagem
      },
    });

    return data;
  }
}

module.exports = CreateCategoriaUseCase;
