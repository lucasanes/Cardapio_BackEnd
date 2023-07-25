const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require("../../../globalFunctions")

class DeleteProdutoUseCase {
  async execute({ id, token }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const produtoAntigo = await prisma.produto.findFirst({
      where: {
        id,
      },
    });

    if (!produtoAntigo) {
      throw new AppError("Esta produto não existente.");
    }

    await prisma.produto.delete({
      where: {
        id,
      },
    });

    return produtoAntigo;
  }
}

module.exports = DeleteProdutoUseCase;
