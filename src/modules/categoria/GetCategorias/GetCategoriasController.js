const GetCategoriasUseCase = require("./GetCategoriasUseCase");

class GetCategoriasController {
  async handle(request, response) {
    const getCategoriasUseCase = new GetCategoriasUseCase();

    const categorias = await getCategoriasUseCase.execute();
    response.status(200).json(categorias);
  }
}

module.exports = GetCategoriasController;
