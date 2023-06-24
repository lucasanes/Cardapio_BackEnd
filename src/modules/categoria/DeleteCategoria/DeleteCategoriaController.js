const DeleteCategoriaUseCase = require("./DeleteCategoriaUseCase");

class DeleteCategoriaController {
  async handle(request, response) {
    const deleteCategoriaUseCase = new DeleteCategoriaUseCase();

    const { id } = request.params;

    const categoria = await deleteCategoriaUseCase.execute({ id });
    response.json(categoria);
  }
}

module.exports = DeleteCategoriaController;
