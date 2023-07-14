const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
const moment = require("moment")
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
      throw new AppError("Este código é inválido.")
    } else {
      await prisma.recovery.delete({
        where: {
          id: recoveryAlreadyExists.id
        }
      })
    }

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return {id: user.id, created_at}
    
  }
}

module.exports = GetRecoveryUseCase;
