class AppError {
  mensagem;
  statusCode;

  constructor(mensagem, statusCode = 400) {
    this.mensagem = mensagem;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
