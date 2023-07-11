const auth = require("../../../config/auth");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
const jwt = require("jsonwebtoken");
require("../../../globalFunctions")

class VerifyTokenUseCase {
  async execute({ token }) {

    let user;

    if (token == undefined || token == null || token == '') {
        throw new AppError("Ocorreu algum erro.")
    }

    if (verifyToken(token)) {

        user = await prisma.user.findFirst({
            where: {
                id: decodeToken(token)
            }
        })
        
    } else {
        throw new AppError("Token inválido.")
    }

    return {token, user}
  }
}

module.exports = VerifyTokenUseCase;
