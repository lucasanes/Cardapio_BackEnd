const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')

class DeleteRecoveryUseCase {
  async execute({email}) {

    const recoveryAlreadyExists = await prisma.recovery.findFirst({
      where: {
        userEmail: email
      }
    })

    if (recoveryAlreadyExists == null) {
      throw new AppError("Não existe mais nenhuma recuperação neste e-mail.")
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

module.exports = DeleteRecoveryUseCase;
