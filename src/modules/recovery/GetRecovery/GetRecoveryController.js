const GetRecoveryUseCase = require("./GetRecoveryUseCase");

class GetRecoveryController {
  async handle(request, response) {
    const getRecoveryUseCase = new GetRecoveryUseCase();

    const all = await getRecoveryUseCase.execute(request.body);
    response.status(200).json(all);
  }
}

module.exports = GetRecoveryController;
