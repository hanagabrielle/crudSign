function errorHandler(res, error) {
  let status = 500;
  let mensagem = "Erro interno do servidor";

  if (error.message.includes("E-mail já existente")) {
    status = 400;
    mensagem = error.message;
  } else if (error.message.includes("Usuário e/ou senha inválidos")) {
    status = 401;
    mensagem = error.message;
  } else if (error.message.includes("Usuário não encontrado")) {
    status = 404;
    mensagem = error.message;
  } else if (error.message.includes("Não autorizado")) {
    status = 401;
    mensagem = error.message;
  } else if (error.message.includes("Sessão inválida")) {
    status = 401;
    mensagem = error.message;
  }

  res.status(status).json({ mensagem });
}

export default errorHandler;
