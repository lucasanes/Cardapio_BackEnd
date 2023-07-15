const auth = require("../../../config/auth");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
const jwt = require("jsonwebtoken");
require("../../../globalFunctions")

class VerifyTokenUseCase {
  async execute({ token }) {

    let user;
    let restaurante

    if (token == undefined || token == null || token == '') {
        throw new AppError("Ocorreu algum erro.")
    }

    if (verifyToken(token)) {

        user = await prisma.user.findFirst({
            where: {
                id: decodeToken(token)
            },
        })

        restaurante = await prisma.restaurante.findFirst({
            where: {
                userId: user.id
            }
        })
        
    } else {
        throw new AppError("Token inválido.")
    }

    return {token, user, restaurante}
  }
}

module.exports = VerifyTokenUseCase;
