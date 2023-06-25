const { hash, compare } = require("bcrypt");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class EditProdutoUseCase {
  async execute({ id, nome, nomesAdd, preco, precosAdd, descricao, imagem, token }) {

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

    if (nome == null || nome == undefined || nome == "") {
      throw new AppError("Sua produto deve ter um nome.")
    } else {

      const alreadyExistsByName = await prisma.produto.findFirst({
        where: {
          nome
        }
      })

      if (data.nome != nome) {
        if (alreadyExistsByName) {
          throw new AppError("Você já tem uma produto com este nome.")
        }
      }

      data.nome = nome
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
