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