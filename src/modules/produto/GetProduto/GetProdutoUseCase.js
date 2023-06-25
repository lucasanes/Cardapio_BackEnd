const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require("../../../globalFunctions")

class GetProdutoUseCase {
  async execute({id, token}) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const produto = await prisma.produto.findFirst({
      where: {
        id
      }
    })

    return produto;
  }
}

module.exports = GetProdutoUseCase;
