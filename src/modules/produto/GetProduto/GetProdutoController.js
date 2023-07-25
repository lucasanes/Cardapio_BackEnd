const GetProdutoUseCase = require("./GetProdutoUseCase");

class GetProdutoController {
  async handle(request, response) {
    const getProdutoUseCase = new GetProdutoUseCase();

    const {id} = request.params
    const token = request.headers.authorization

    const produto = await getProdutoUseCase.execute({id, token});
    response.status(200).json(produto);
  }
}

module.exports = GetProdutoController;
