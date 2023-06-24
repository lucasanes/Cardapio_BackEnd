const auth = require("../../../config/auth");
const AppError = require("../../../utils/AppError");
const prisma = require("../../database/prisma");
const jwt = require("jsonwebtoken");

class VerifyTokenUseCase {
  async execute({ token }) {

    let tokenIsValid

    if (token == undefined || token == null || token == '') {
        throw new AppError("Você precisa passar o token.")
    }

    if (!token) {
        throw new AppError("Token inválido.")
    } else {

        try {

            if (jwt.verify(token, auth.jwt.secretUser)) {
                tokenIsValid = true
            }

        } catch (erro) {
            tokenIsValid = false
        }

    }
    
    return {tokenIsValid};
  }
}

module.exports = VerifyTokenUseCase;
