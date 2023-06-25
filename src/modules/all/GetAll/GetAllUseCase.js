const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')

class GetAllUseCase {
  async execute({id}) {

    if (!id) {
      throw new AppError("Ocorreu algum erro.")
    }

    if (!verifyToken(id)) {
      throw new AppError("Sem permissão.")
    }

    const all = await prisma.restaurante.findFirst({
      where: {
        userId: decodeToken(id)
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
