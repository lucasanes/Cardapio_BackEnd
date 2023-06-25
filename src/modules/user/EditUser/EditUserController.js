const EditUserUseCase = require("./EditUserUseCase");

class EditUserController {
  async handle(request, response) {
    const { username, email, senha, senhaConfirmada, senhaAtual } = request.body;

    const {token} = request.params
    const editUserUseCase = new EditUserUseCase();

    const user = await editUserUseCase.execute({
      token,
      username,
      email,
      senha,
      senhaConfirmada,
      senhaAtual
    });
    response.status(201).json(user);
  }
}

module.exports = EditUserController;
