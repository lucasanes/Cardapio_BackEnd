const GetCategoriaUseCase = require("./GetCategoriaUseCase");

class GetCategoriaController {
  async handle(request, response) {
    const getCategoriaUseCase = new GetCategoriaUseCase();

    const {id} = request.params

    const categoria = await getCategoriaUseCase.execute({id});
    response.status(200).json(categoria);
  }
}

module.exports = GetCategoriaController;
