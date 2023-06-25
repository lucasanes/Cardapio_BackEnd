const VerifyTokenUseCase = require("./VerifyTokenUseCase");

class VerifyTokenController {
  async handle(request, response) {
    const { token } = request.body;

    const verifyTokenUseCase = new VerifyTokenUseCase();

    const tokenIsValid = await verifyTokenUseCase.execute(request.params);
    response.status(200).json(tokenIsValid);
  }
}

module.exports = VerifyTokenController;
