const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require("../../../globalFunctions")

class GetCategoriaUseCase {
  async execute({id, token}) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const categoria = await prisma.categoria.findFirst({
      where: {
        id
      }
    })

    return categoria;
  }
}

module.exports = GetCategoriaUseCase;
