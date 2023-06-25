const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class CreateProdutoUseCase {
  async execute({ nome, nomesAdd, descricao, imagem, preco, precosAdd, categoriaId, token }) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    if (nome == undefined || nome == null || nome == '') {
      throw new AppError("Seu produto precisa ter um nome.")
    }

    if (descricao == undefined || descricao == null || descricao == '') {
      throw new AppError("Seu produto precisa ter uma descrição.")
    }

    if (imagem == undefined || imagem == null || imagem == '') {
      throw new AppError("Seu produto precisa ter uma imagem.")
    }

    if (preco == undefined || preco == null || preco == '') {
      throw new AppError("Seu produto precisa ter um preço.")
    }

    if (categoriaId == undefined || categoriaId == null || categoriaId == '') {
      throw new AppError("Seu produto precisa estar em uma categoria.")
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
