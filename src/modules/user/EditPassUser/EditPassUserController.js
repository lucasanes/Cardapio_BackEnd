const EditPassUserUseCase = require("./EditPassUserUseCase");

class EditPassUserController {
  async handle(request, response) {
    const {senha, senhaConfirmada } = request.body;

    const {id} = request.params
    const editPassUserUseCase = new EditPassUserUseCase();

    const user = await editPassUserUseCase.execute({
      id,
      senha,
      senhaConfirmada,
    });
    response.status(201).json(user);
  }
}

module.exports = EditPassUserController;
