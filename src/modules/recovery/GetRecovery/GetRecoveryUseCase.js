const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')

class GetRecoveryUseCase {
  async execute({code, email}) {

    const recoveryAlreadyExists = await prisma.recovery.findFirst({
      where: {
        code,
        userEmail: email
      }
    })

    if (recoveryAlreadyExists == null) {
      throw new AppError("Este código é inválido ou foi expirado.")
    } else {
      await prisma.recovery.delete({
        where: {
          id: recoveryAlreadyExists.id
        }
      })
    }

    return recoveryAlreadyExists
    
  }
}

module.exports = GetRecoveryUseCase;
