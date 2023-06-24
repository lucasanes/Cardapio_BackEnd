const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");

class DeleteCategoriaUseCase {
  async execute({ id }) {

    if (!id) {
      throw new AppError("ID não existente.");
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
