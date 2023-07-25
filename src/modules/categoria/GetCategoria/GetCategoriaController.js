const GetCategoriaUseCase = require("./GetCategoriaUseCase");

class GetCategoriaController {
  async handle(request, response) {
    const getCategoriaUseCase = new GetCategoriaUseCase();

    const {id} = request.params
    const token = request.headers.authorization

    const categoria = await getCategoriaUseCase.execute({id, token});
    response.status(200).json(categoria);
  }
}

module.exports = GetCategoriaController;
