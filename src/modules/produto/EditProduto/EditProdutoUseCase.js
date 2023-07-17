const { hash, compare } = require("bcrypt");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class EditProdutoUseCase {
  async execute({ code, id, nome, nomesAdd, preco, precosAdd, descricao, imagem, token }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const data = await prisma.produto.findFirst({
      where: {
        id
      },
    });

    if (!data) {
      throw new AppError("Produto não existente.");
    }

    if (code == undefined || code == null || code == '') {
      throw new AppError("Seu produto precisa ter um código.")
    }

    const codeExists = await prisma.produto.findFirst({
      where: {
        code
      },
    });

    if (codeExists) {

      const categoria = await prisma.categoria.findFirst({
        where: {
          id: codeExists.categoriaId,
        },
      })

      const restaurante = await prisma.restaurante.findFirst({
        where: {
          userId: decodeToken(token)
        }
      })

      if (categoria.restauranteId == restaurante.id) {
        throw new AppError("Este código já está sendo usado por algum produto em seu restaurante.")
      }
    }

    if (nome == null || nome == undefined || nome == "") {
      throw new AppError("Seu produto deve ter um nome.")
    }

    if (nomesAdd != undefined && nomesAdd != '') {
      data.nomesAdd = nomesAdd
    } else {
      data.nomesAdd = null
    }

    if (preco != undefined && preco != '') {
      data.preco = preco
    } else {
      data.preco = null
    }

    if (precosAdd != undefined && precosAdd != '') {
      data.precosAdd = precosAdd
    } else {
      data.precosAdd = null
    }

    if (descricao != undefined && descricao != '') {
      data.descricao = descricao
    } else {
      data.descricao = null
    }

    if (imagem != undefined && imagem != '') {
      data.imagem = imagem
    } else {
      data.imagem = null
    }

    const produtoAtualizada = await prisma.produto.update({
      where: {
        id: data.id
      },
      data: data
    });

    return produtoAtualizada;
  }
}

module.exports = EditProdutoUseCase;
