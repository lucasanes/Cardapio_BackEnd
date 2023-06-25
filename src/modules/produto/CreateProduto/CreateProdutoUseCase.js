const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class CreateProdutoUseCase {
  async execute({ nome, nomesAdd, descricao, imagem, preco, precosAdd, categoriaId, token }) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const data = await prisma.produto.create({
      data: {
        nome,
        nomesAdd,
        preco,
        precosAdd,
        descricao,
        imagem,
        categoriaId
      },
    });

    return data;
  }
}

module.exports = CreateProdutoUseCase;
