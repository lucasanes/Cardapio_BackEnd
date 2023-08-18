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
        categorias: {
          orderBy: {
            nome: 'asc'
          },
          include: {
            produtos: {
              orderBy: {
                nome: 'asc'
              }
            }
          }
        }
      },
    });

    return all;
  }
}

module.exports = GetAllUseCase;
