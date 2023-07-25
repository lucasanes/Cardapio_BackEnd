const CreateCategoriaUseCase = require("./CreateCategoriaUseCase");

class CreateCategoriaController {
  async handle(request, response) {

    const createCategoriaUseCase = new CreateCategoriaUseCase();
    
    const token = request.headers.authorization

    const data = await createCategoriaUseCase.execute(request.body, token);
    response.status(201).json(data);
  }
}

module.exports = CreateCategoriaController;