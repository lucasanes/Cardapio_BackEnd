const SendRecoveryUseCase = require("./SendRecoveryUseCase");

class SendRecoveryController {
  async handle(request, response) {
    const sendRecoveryUseCase = new SendRecoveryUseCase();

    const all = await sendRecoveryUseCase.execute(request.body);
    response.status(200).json(all);
  }
}

module.exports = SendRecoveryController;
