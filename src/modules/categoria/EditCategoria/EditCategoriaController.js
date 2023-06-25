const EditCategoriaUseCase = require("./EditCategoriaUseCase");

class EditCategoriaController {
  async handle(request, response) {
    const { nome, descricao, imagem, token } = request.body;

    const { id } = request.params;
    const editCategoriaUseCase = new EditCategoriaUseCase();

    const data = await editCategoriaUseCase.execute({
      id,
      nome, 
      descricao, 
      imagem,
      token
    });
    response.status(201).json(data);
  }
}

module.exports = EditCategoriaController;
