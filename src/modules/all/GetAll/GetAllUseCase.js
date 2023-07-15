const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')

class GetAllUseCase {
  async execute({id}) {

    if (id == null || id == '' || id == undefined) {
      throw new AppError("Ocorreu algum erro.")
    }

    if (!verifyToken(id)) {
      throw new AppError("Sem permissão.")
    }

    const all = await prisma.restaurante.findFirst({
      where: {
        userId: decodeToken(id)
      },
      select: {
        id: false,
        imagem: false,
        nome: false,
        userId: false,
        categorias: true
      },
      include: {
        categorias: {
          include: {
            produtos: true
          }
        }
      }
    });

    return all;
  }
}

module.exports = GetAllUseCase;
