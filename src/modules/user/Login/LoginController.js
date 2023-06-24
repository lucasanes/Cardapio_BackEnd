const AppError = require("../../../utils/AppError");
const LoginUseCase = require("./LoginUseCase");

class LoginController {
  async handle(request, response) {

    const loginUseCase = new LoginUseCase();

    const user = await loginUseCase.execute(request.body);
    response.status(200).json(user);
  }
}

module.exports = LoginController;
