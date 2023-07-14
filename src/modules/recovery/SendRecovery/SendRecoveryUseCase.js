const prisma = require("../../database/prisma");
const AppError = require("../../../utils/AppError");
require('../../../globalFunctions')
const nodemailer = require("nodemailer");

class SendRecoveryUseCase {
  async execute({email, created_at}) {

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists == null) {
      throw new AppError('E-mail não cadastrado.')
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cardapiosadm@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    const code = gerarCodigo()

    const recoveryAlreadyExists = await prisma.recovery.findFirst({
      where: {
        userEmail: email
      }
    })

    if (recoveryAlreadyExists != null) {
      await prisma.recovery.delete({
        where: {
          id: recoveryAlreadyExists.id
        }
      })
    }

    console.log(created_at)

    const recovery = await prisma.recovery.create({
      data: {
        code,
        userEmail: email,
        created_at
      }
    })

    const mailOptions = {
      from: 'Cardápios Admin <cardapiosadm@gmail.com>',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <div style="width: 100%; height: fit-content; background-color: #ffffff; border: 2px solid #000000; text-align: center; padding: 20px;">
          <h1 style="color: black;">Cardápios Admin</h1>
          <h2 style="color: black;">Olá! Uma recuperação de senha foi solicitada. Caso não tenha solicitado, ignore ou contate-nos.</h2>
          <h3 style="color: black;">${code}</h3>
        </div>
      `
    };
  
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        throw new AppError('Erro ao enviar o e-mail de recuperação de senha!')
      }
    });

    return recovery
    
  }
}

module.exports = SendRecoveryUseCase;
