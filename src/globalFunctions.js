const { decode, verify } = require("jsonwebtoken")
const auth = require("./config/auth")

global.decodeToken = function (token) {
  const userId = decode(token, auth.jwt.secretUser).id
  return userId
}

global.verifyToken = function (token) {
  try {

    if (verify(token, auth.jwt.secretUser)) {
      return true
    }

  } catch (erro) {
    return false
  }
}

global.gerarCodigo = function () {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = "0123456789"
  let codigo = '';

  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      const indiceLetras = Math.floor(Math.random() * letras.length);
      codigo += letras.charAt(indiceLetras);
    } else {
      const indiceNums = Math.floor(Math.random() * nums.length);
      codigo += nums.charAt(indiceNums);
    }
  }

  return codigo;
}