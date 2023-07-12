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
      throw new AppError("Este código é inválido ou foi expirado.")
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

    const created_at = recoveryAlreadyExists.created_at
    const created_atLocal = moment(created_at).local();

    return {id: user.id, created_at: created_atLocal}
    
  }
}

module.exports = GetRecoveryUseCase;
