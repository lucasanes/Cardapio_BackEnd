const EditProdutoUseCase = require("./EditProdutoUseCase");

class EditProdutoController {
  async handle(request, response) {
    const { code, nome, nomesAdd, preco, precosAdd, descricao, imagem, token } = request.body;

    const { id } = request.params;
    const editProdutoUseCase = new EditProdutoUseCase();

    const data = await editProdutoUseCase.execute({
      id,
      code,
      nome,
      nomesAdd,
      preco,
      precosAdd,
      descricao, 
      imagem,
      token
    });
    response.status(201).json(data);
  }
}

module.exports = EditProdutoController;
