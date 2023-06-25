const GetAllUseCase = require("./GetAllUseCase");

class GetAllController {
  async handle(request, response) {
    const getAllUseCase = new GetAllUseCase();

    const all = await getAllUseCase.execute(request.params);
    response.status(200).json(all);
  }
}

module.exports = GetAllController;
