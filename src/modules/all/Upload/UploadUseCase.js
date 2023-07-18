const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')
const DiskStorage = require("../../../providers/DiskStorage")

class UploadUseCase {
  async execute({image, token}) {

    if (token != 'noauth') {
      if (!verifyToken(token)) {
        throw new AppError("Sem permissão.")
      }
    }

    const diskStorage = new DiskStorage()

    const imagem = await diskStorage.saveFile(image)

    return imagem;
    
  }
}

module.exports = UploadUseCase;
