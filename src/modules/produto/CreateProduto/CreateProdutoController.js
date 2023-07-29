const CreateProdutoUseCase = require("./CreateProdutoUseCase");

class CreateProdutoController {
  async handle(request, response) {

    const createProdutoUseCase = new CreateProdutoUseCase();

    request.body.token = request.headers.authorization

    const data = await createProdutoUseCase.execute(request.body);
    response.status(201).json(data);
  }
}

module.exports = CreateProdutoController;