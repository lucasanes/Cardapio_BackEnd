const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
const { sign } = require("jsonwebtoken");
const auth = require("../../../config/auth");
const { compare } = require("bcrypt");

class LoginUseCase {
  async execute({username, email, senha}) {
    
    let user;
   
    if (username != undefined && username != '' && username != null) {

      username = username.toLowerCase()

      if (!username) {
        throw new AppError("Dados necessários não informados.")
      }

      const usernameAlreadyExists = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!usernameAlreadyExists) {
        throw new AppError("User/Email ou senha incorretos.");
      } else {
        user = usernameAlreadyExists
      }

    } else if (email != undefined && email != '' && email != null) {

      if (!email) {
        throw new AppError("Dados necessários não informados.")
      }

      const emailAlreadyExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!emailAlreadyExists) {
        throw new AppError("User/Email ou senha incorretos.");
      } else {
        user = emailAlreadyExists
      }

    } else {
      throw new AppError("Dados necessários não informados.")
    }

    if (senha != undefined) {

      if (!senha) {
        throw new AppError("Dados necessários não informados.")
      }

      const match = await compare(senha, user.senha)

      if (!match) {
        throw new AppError("User/Email ou senha incorretos.")        
      }

    } else {
      throw new AppError("Dados necessários não informados.")
    }

    const token = sign(
      { id: user.id },
      auth.jwt.secretUser,
      {expiresIn: auth.jwt.expiresIn}
    )

    return {user, token};
  }
}

module.exports = LoginUseCase;
