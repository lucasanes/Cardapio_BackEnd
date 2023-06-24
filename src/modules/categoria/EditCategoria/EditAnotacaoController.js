const EditAnotacaoUseCase = require("./EditAnotacaoUseCase");

class EditAnotacaoController {
  async handle(request, response) {
    const { nome, descricao } = request.body;

    const { id } = request.params;
    const editAnotacaoUseCase = new EditAnotacaoUseCase();

    const data = await editAnotacaoUseCase.execute({
      id,
      nome, 
      descricao
    });
    response.status(201).json(data);
  }
}

module.exports = EditAnotacaoController;
