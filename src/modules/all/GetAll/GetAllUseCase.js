const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");

class GetAllUseCase {
  async execute() {

    const all = await prisma.categoria.findMany({
      include: {
        produtos: true
      }
    });

    return all;
  }
}

module.exports = GetAllUseCase;
