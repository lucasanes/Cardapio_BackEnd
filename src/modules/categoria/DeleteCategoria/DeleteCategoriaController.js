const DeleteCategoriaUseCase = require("./DeleteCategoriaUseCase");

class DeleteCategoriaController {
  async handle(request, response) {
    const deleteCategoriaUseCase = new DeleteCategoriaUseCase();

    const {id} = request.params
    const token = request.headers.authorization
    
    const categoria = await deleteCategoriaUseCase.execute({id, token});
    response.json(categoria);
  }
}

module.exports = DeleteCategoriaController;
