const { hash, compare } = require("bcrypt");
const AppError = require('../../../utils/AppError');
const prisma = require("../../database/prisma");
require ("../../../globalFunctions")

const senhaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%*_&^-]{8,24})$/

class EditPassUserUseCase {
  async execute({ id, senha, senhaConfirmada }) {

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não existente.")
    }

    if (senha == undefined || senha == '' || senha == null) {
      if (senhaConfirmada == undefined || senhaConfirmada == '' || senhaConfirmada == null) {
        throw new AppError("Dados necessários não informados.")
      }
    }

    if (senha !== senhaConfirmada) {
      throw new AppError("Suas senhas não coincidem.")
    }

    if (senha.length < 8) {
      throw new AppError("Sua senha precisa ter no mínimo 8 caracteres.")
    } else if (senha.length > 24) {
      throw new AppError("Sua senha não pode passar de 24 caracteres.")
    }

    if (!senhaRegex.test(senha)) {
      throw new AppError("Sua senha precisa ter um caractere minúsculo, um maíusculo e um número.")
    }

    const senhaCript = await hash(senha, 10);
    user.senha = senhaCript;

    const userAtualizado = await prisma.user.update({
      where: {
        id
      },
      data: user
    });

    return userAtualizado;
  }
}

module.exports = EditPassUserUseCase;
