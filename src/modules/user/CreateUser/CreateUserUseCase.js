const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
const { hash } = require("bcrypt");

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const senhaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%*_&^-]{8,24})$/

class CreateUserUseCase {
  async execute({username, email, senha, senhaConfirmada, nomeRestaurante, codigo }) {

    if (codigo != undefined && codigo != '' && codigo != null) {

      if (codigo != process.env.SECRET_CODE) {
        throw new AppError("Você precisa ter um código válido para criar uma conta.")
      }

    } else {
      throw new AppError("Você precisa ter um código para criar uma conta.")
    }

    if (username == undefined || username == '' || username == null) {
      throw new AppError("Dados necessários não preenchidos.")
    }

    username = username.toLowerCase()

    if (username.length < 3) {
      throw new AppError("Seu username precisa ter no mínimo 3 caracteres.")
    }

    const verificarEspaco = /\s/g.test(username)

    if (verificarEspaco) {
      throw new AppError("Seu username não pode conter espaços.")
    }

    const usernameAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (usernameAlreadyExists) {
      throw new AppError("Username já cadastrado.");
    }

    if (email == undefined || email == '' || email == null) {
      throw new AppError("Dados necessários não preenchidos.")
    }

    if (!emailRegex.test(email)) {
      throw new AppError("Email inválido.")
    }

    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new AppError("Email já cadastrado.");
    }

    if (senha == undefined || senha == '' || senha == null) {
      throw new AppError("Dados necessários não preenchidos.")
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

    if (nomeRestaurante == null || nomeRestaurante == undefined || nomeRestaurante == "") {
      throw new AppError("Dados necessários não preenchidos!")
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        senha: senhaCript,
      },
    });

    const restaurante = await prisma.restaurante.create({
      data: {
        nome: nomeRestaurante,
        userId: user.id
      }
    })

    return {user, restaurante};
  }
}

module.exports = CreateUserUseCase;
