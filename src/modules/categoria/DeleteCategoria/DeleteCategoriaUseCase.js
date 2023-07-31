const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require("../../../globalFunctions")
const DiskStorage = require("../../../providers/DiskStorage")

class DeleteCategoriaUseCase {
  async execute({ id, token }) {

    const diskStorage = new DiskStorage()

    if (!id) {
      throw new AppError("ID não existente.");
    }

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

    await diskStorage.deleteFile(categoriaAntiga.imagem.split('.app/')[1])

    await prisma.categoria.delete({
      where: {
        id,
      },
    });

    return categoriaAntiga;
  }
}

module.exports = DeleteCategoriaUseCase;
