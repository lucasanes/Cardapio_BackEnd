const { hash, compare } = require("bcrypt");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
require("../../../globalFunctions")

class EditCategoriaUseCase {
  async execute({ id, nome, imagem, token }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    if (!verifyToken(token)) {
      throw new AppError("Sem permissão.")
    }

    const data = await prisma.categoria.findFirst({
      where: {
        id
      },
    });

    if (!data) {
      throw new AppError("Categoria não existente.");
    }

    if (nome == null || nome == undefined || nome == "") {
      throw new AppError("Sua categoria deve ter um nome.")
    } else {

      const alreadyExistsByName = await prisma.categoria.findFirst({
        where: {
          nome
        }
      })

      if (data.nome != nome) {
        if (alreadyExistsByName) {
          throw new AppError("Você já tem uma categoria com este nome.")
        }
      }

      data.nome = nome
    }

    if (imagem != undefined && imagem != '') {
      data.imagem = imagem
    } else {
      throw new AppError("Sua categoria deve ter uma imagem.")
    }

    const categoriaAtualizada = await prisma.categoria.update({
      where: {
        id: data.id
      },
      data: data
    });

    return categoriaAtualizada;
  }
}

module.exports = EditCategoriaUseCase;
