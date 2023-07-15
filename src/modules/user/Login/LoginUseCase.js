const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
const { sign } = require("jsonwebtoken");
const auth = require("../../../config/auth");
const { compare } = require("bcrypt");

class LoginUseCase {
  async execute({email, senha}) {
    
    let user;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
   
    if (email != undefined && email != '' && email != null) {

      if (emailRegex.test(email)) {

        const emailAlreadyExists = await prisma.user.findFirst({
          where: {
            email
          },
          include: {
            restaurantes: {
                select: {
                  nome: true,
                  id: true
                }
            }
        }
        });
  
        if (!emailAlreadyExists) {
          throw new AppError("E-mail ou senha incorretos.");
        } else {
          user = emailAlreadyExists
        }  

      } else {
        throw new AppError("E-mail inválido.")
      }

    } else {
      throw new AppError("Informe seu e-mail.")
    }

    if (senha != undefined && senha != '') {

      const match = await compare(senha, user.senha)

      if (!match) {
        throw new AppError("E-mail ou senha incorretos.")
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
