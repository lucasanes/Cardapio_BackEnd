const { hash, compare } = require("bcrypt");
const AppError = require('../../../utils/AppError');
const prisma = require("../../database/prisma");

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const senhaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%*_&^-]{8,24})$/

class EditUserUseCase {
  async execute({ id, nome, username, email, senha, senhaConfirmada, senhaAtual }) {

    if (!id) {
      throw new AppError("ID não existente.")
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não existente.")
    }

    if (senhaAtual == undefined || senhaAtual == null || senhaAtual == "") {
      throw new AppError("Você precisa preencher sua senha atual para atualizar sua conta.")
    } else {

      const match = await compare(senhaAtual, user.senha)

      if (!match) {
        throw new AppError("Senha atual incorreta.")
      }

    }

    if (nome == undefined || nome == '' || nome == null) {
      if (username == undefined || username == '' || username == null) {
        if (email == undefined || email == '' || email == null) {
          if (senha == undefined || senha == '' || senha == null) {
            if (senhaConfirmada == undefined || senhaConfirmada == '' || senhaConfirmada == null) {
              throw new AppError("Você precisa passar no mínimo um campo a ser alterado.")
            }
          }
        }
      }
    }

    if (senha !== senhaConfirmada) {
      throw new AppError("Sua nova senha não coincide.")
    }

    if (username != undefined && username != null && username != '') {

      username = username.toLowerCase()

      const usernameAlreadyExists = await prisma.user.findFirst({
        where: {
          username,
        },
      });


      if (username.length < 3) {
        throw new AppError("Seu username precisa ter no mínimo 3 caracteres.")
      }

      const verificarEspaco = /\s/g.test(username)

      if (verificarEspaco) {
        throw new AppError("Seu username não pode conter espaços.")
      }

      if (usernameAlreadyExists) {
        throw new AppError("Username já utilizado.");
      }

    }

    if (email != undefined && email != null && email != '') {
      const emailAlreadyExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!emailRegex.test(email)) {
        throw new AppError("Email inválido.")
      }

      if (emailAlreadyExists) {
        throw new AppError("Email já utilizado.");
      }
    }

    if(nome == null || nome == '') {
      user.nome = user.nome;
    } else {
      user.nome = nome
    }
    
    if(username == null || username == '') {
      user.username = user.username;
    } else {
      user.username = username
    }

    if (email == null || email == '') {
      user.email = user.email;
    } else {
      user.email = email
    }

    if (senha != undefined && senha != null && senha != '') {

      if (senha === senhaAtual) {
        throw new AppError("Esta já é sua senha. Caso queira mantê-la, deixe o campo vazio.")
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
    } else {
      user.senha = user.senha;
    }

    const userAtualizado = await prisma.user.update({
      where: {
        id
      },
      data: user
    });

    return userAtualizado;
  }
}

module.exports = EditUserUseCase;
