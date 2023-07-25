const CreateProdutoUseCase = require("./CreateProdutoUseCase");

class CreateProdutoController {
  async handle(request, response) {

    const createProdutoUseCase = new CreateProdutoUseCase();

    const token = request.headers.authorization

    const data = await createProdutoUseCase.execute(request.body, token);
    response.status(201).json(data);
  }
}

module.exports = CreateProdutoController;