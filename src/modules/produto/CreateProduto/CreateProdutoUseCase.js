const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class CreateProdutoUseCase {
  async execute({ code, nome, nomesAdd, descricao, imagem, preco, precosAdd, categoriaId, created_at, token }) {

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    if (code == undefined || code == null || code == '') {
      throw new AppError("Seu produto precisa ter um código.")
    }

    const restaurante = await prisma.restaurante.findFirst({
      where: {
        userId: decodeToken(token)
      }
    })

    const codeExists = await prisma.produto.findFirst({
      where: {
        code: Number(code),
        restauranteId: restaurante.id
      },
    });

    if (codeExists) {
      throw new AppError("Este código já está sendo usado por algum produto em seu restaurante.")
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
        code: Number(code),
        nome,
        ativado: true,
        nomesAdd,
        preco: Number(preco),
        precosAdd,
        descricao,
        imagem,
        created_at,
        categoriaId,
        restauranteId: restaurante.id
      },
    });

    return data;
  }
}

module.exports = CreateProdutoUseCase;
