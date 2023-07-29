const CreateCategoriaUseCase = require("./CreateCategoriaUseCase");

class CreateCategoriaController {
  async handle(request, response) {

    const createCategoriaUseCase = new CreateCategoriaUseCase();
    
    request.body.token = request.headers.authorization

    const data = await createCategoriaUseCase.execute(request.body);
    response.status(201).json(data);
  }
}

module.exports = CreateCategoriaController;