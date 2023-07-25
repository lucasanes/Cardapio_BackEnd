const DeleteProdutoUseCase = require("./DeleteProdutoUseCase");

class DeleteProdutoController {
  async handle(request, response) {
    const deleteProdutoUseCase = new DeleteProdutoUseCase();

    const {id} = request.params 
    const token = request.headers.authorization
    
    const produto = await deleteProdutoUseCase.execute({id, token});
    response.json(produto);
  }
}

module.exports = DeleteProdutoController;
