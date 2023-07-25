const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require("../../../globalFunctions")

class DeleteCategoriaUseCase {
  async execute({ id, token }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    console.log(token)

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const categoriaAntiga = await prisma.categoria.findFirst({
      where: {
        id,
      },
    });

    if (!categoriaAntiga) {
      throw new AppError("Esta categoria não existente.");
    }

    await prisma.categoria.delete({
      where: {
        id,
      },
    });

    return categoriaAntiga;
  }
}

module.exports = DeleteCategoriaUseCase;
