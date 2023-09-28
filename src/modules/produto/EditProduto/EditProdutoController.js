const EditProdutoUseCase = require("./EditProdutoUseCase");

class EditProdutoController {
  async handle(request, response) {
    const { code, ativado, nome, nomesAdd, preco, precosAdd, descricao, imagem, categoriaId } = request.body;
    const token = request.headers.authorization
    const { id } = request.params;
    const editProdutoUseCase = new EditProdutoUseCase();

    const data = await editProdutoUseCase.execute({
      id,
      code,
      ativado,
      nome,
      nomesAdd,
      preco,
      precosAdd,
      descricao, 
      imagem,
      categoriaId,
      token
    });
    response.status(201).json(data);
  }
}

module.exports = EditProdutoController;
