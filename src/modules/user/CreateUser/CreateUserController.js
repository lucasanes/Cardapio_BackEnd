const CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute(request.body);
    response.status(201).json(user);
  }
}

module.exports = CreateUserController;
