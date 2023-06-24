const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");

class GetCategoriasUseCase {
  async execute() {

    const categorias = await prisma.categoria.findMany();

    return categorias;
  }
}

module.exports = GetCategoriasUseCase;
