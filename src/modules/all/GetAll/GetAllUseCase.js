const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')

class GetAllUseCase {
  async execute({id}) {

    //a

    if (!id) {
      throw new AppError("Ocorreu algum erro.")
    }

    const all = await prisma.restaurante.findFirst({
      where: {
        id
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
