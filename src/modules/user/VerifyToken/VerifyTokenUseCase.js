const auth = require("../../../config/auth");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
const jwt = require("jsonwebtoken");
require("../../../globalFunctions")

class VerifyTokenUseCase {
  async execute({ token }) {

    if (token == undefined || token == null || token == '') {
        throw new AppError("Ocorreu algum erro.")
    }

    if (verifyToken(token)) {

        const user = await prisma.user.findFirst({
            where: {
                id: decodeToken(token)
            }
        })
        
        return {token, user}
    } else {
        return false
    }
  }
}

module.exports = VerifyTokenUseCase;
