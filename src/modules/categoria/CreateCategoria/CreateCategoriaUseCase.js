const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class CreateCategoriaUseCase {
  async execute({ nome, imagem, created_at, token }) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    if (nome == undefined || nome == null || nome == '') {
      throw new AppError("Sua categoria deve ter um nome.")
    }

    if (imagem == undefined || imagem == null || imagem == '') {
      throw new AppError("Sua categoria deve ter uma imagem.")
    }

    const restauranteId = await prisma.restaurante.findFirst({
      where: {
        userId: decodeToken(token)
      }
    })

    const data = await prisma.categoria.create({
      data: {
        nome, 
        imagem,
        created_at,
        restauranteId: restauranteId.id
      },
    });

    return data;
  }
}

module.exports = CreateCategoriaUseCase;
