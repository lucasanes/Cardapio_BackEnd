class AppError {
  msg;
  statusCode;

  constructor(msg, statusCode = 400) {
    this.msg = msg;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
