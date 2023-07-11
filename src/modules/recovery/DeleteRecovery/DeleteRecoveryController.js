const DeleteRecoveryUseCase = require("./DeleteRecoveryUseCase");

class DeleteRecoveryController {
  async handle(request, response) {
    const deleteRecoveryUseCase = new DeleteRecoveryUseCase();

    const all = await deleteRecoveryUseCase.execute(request.params);
    response.status(200).json(all);
  }
}

module.exports = DeleteRecoveryController;
