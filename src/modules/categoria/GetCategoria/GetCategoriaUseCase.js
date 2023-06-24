const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");

class GetCategoriaUseCase {
  async execute({id}) {

    const categoria = await prisma.categoria.findFirst({
      where: {
        id
      }
    })

    return categoria;
  }
}

module.exports = GetCategoriaUseCase;
