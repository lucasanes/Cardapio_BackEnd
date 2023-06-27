const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
const { sign } = require("jsonwebtoken");
const auth = require("../../../config/auth");
const { compare } = require("bcrypt");

class LoginUseCase {
  async execute({username, senha}) {
    
    let user;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
   
    if (username != undefined && username != '' && username != null) {

      username = username.toLowerCase()

      if (emailRegex.test(username)) {

        const emailAlreadyExists = await prisma.user.findFirst({
          where: {
            email: username,
          },
        });
  
        if (!emailAlreadyExists) {
          throw new AppError("Email ou senha incorretos.");
        } else {
          user = emailAlreadyExists
        }  

      } else {

        const usernameAlreadyExists = await prisma.user.findFirst({
          where: {
            username,
          },
        });
  
        if (!usernameAlreadyExists) {
          throw new AppError("Username ou senha incorretos.");
        } else {
          user = usernameAlreadyExists
        }

      }

    } else {
      throw new AppError("Informe seu Username ou Email.")
    }

    if (senha != undefined && senha != '') {

      const match = await compare(senha, user.senha)

      if (!match) {
        if (emailRegex.test(username)) {
          throw new AppError("Email ou senha incorretos.")
        } else {
          throw new AppError("Username ou senha incorretos.")
        }
      }

    } else {
      throw new AppError("Informe sua senha.")
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
