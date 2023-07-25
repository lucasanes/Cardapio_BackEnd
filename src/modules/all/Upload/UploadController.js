const UploadUseCase = require("./UploadUseCase");

class UploadController {
  async handle(request, response) {
    const uploadUseCase = new UploadUseCase();

    const imagem = request.file.filename
    const token = request.headers.authorization

    const all = await uploadUseCase.execute({image: imagem, token});
    response.status(200).json(all);
  }
}

module.exports = UploadController;
