const { hash, compare } = require("bcrypt");
const AppError = require("../../../../utils/AppError");
const prisma = require("../../../database/prisma");

class EditAnotacaoUseCase {
  async execute({ id, nome, descricao }) {

    if (!id) {
      throw new AppError("ID não existente.");
    }

    const data = await prisma.anotacao.findFirst({
      where: {
        id
      },
    });

    if (!data) {
      throw new AppError("Anotacao não existente.");
    }

    if (nome == null || nome == undefined || nome == "") {
      throw new AppError("Sua anotação deve ter um nome.")
    } else {

      const alreadyExistsByName = await prisma.anotacao.findFirst({
        where: {
          nome
        }
      })

      if (data.nome != nome) {
        if (alreadyExistsByName) {
          throw new AppError("Você já tem uma anotação com este nome.")
        }
      }

      data.nome = nome
    }

    if (descricao != undefined && descricao != '') {
      data.descricao = descricao
    } else {
      data.descricao = null
    }

    const anotacaoAtualizada = await prisma.anotacao.update({
      where: {
        id: data.id
      },
      data: data
    });

    return anotacaoAtualizada;
  }
}

module.exports = EditAnotacaoUseCase;
